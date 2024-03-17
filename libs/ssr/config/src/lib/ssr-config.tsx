import { GetServerSidePropsContext } from 'next';

import {
  buildConfig,
  // checkBlockedUser,
  getMyBand,
  // handleAdminPage,
  // handleBasePackageRouting,
  handleNoConfig,
  // handleNoSession,
} from './helpers';
import { ssrConfigCallBack } from '@my-bands-sites/shared-types';
// SSR build function for entire application currently needed on every page. Can take callback to perform more operations in server side props functions ie(charity page example).
const ssrConfig = async (
  ctx: GetServerSidePropsContext,
  cb?: ssrConfigCallBack
) => {
  try {
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=130, stale-while-revalidate=360'
    );

    // checks for query strings passed by the password reset handler for auth0 and redirects them to appropriate site
    // if (ctx.query.hasOwnProperty('organization_name')) {
    //   return {
    //     redirect: {
    //       destination: `/api/auth/redirect/?organization_name=${ctx.query?.['organization_name']}`,
    //       permanent: false,
    //     },
    //   };
    // }

    const config = await buildConfig(ctx);
    if (!config) {
      console.log('noConfig');
      
      return handleNoConfig();
    }

    // //pass in req, and res to get session. (this way it can see the cookies)
    // const session = await initializeAuth0(ctx.req).getSession(ctx.req, ctx.res);

    // if (!session) {
    //   return handleNoSession(config, ctx);
    // }

    // const isAdmin = session?.user?.[
    //   `${config?.myClient?.cmsDomainName}/app_metadata`
    // ].isAdmin as boolean;

    // const organization = session?.user?.org_id;

    // // this is the user block
    // const blockedUserRedirect = checkBlockedUser(session?.user as UserProfile);
    // if (blockedUserRedirect) {
    //   return blockedUserRedirect;
    // }

    // // admin only packages redirect
    // const basePackageRoutingRedirect = handleBasePackageRouting(config, ctx);
    // if (basePackageRoutingRedirect) {
    //   return basePackageRoutingRedirect;
    // }

    // // checks if user is admin and if they are trying to access admin page, if not redirect to 403 page.
    // const adminPageRedirect = handleAdminPage(ctx, isAdmin);
    // if (adminPageRedirect) {
    //   return adminPageRedirect;
    // }

    // const { user } = session as { user: SessionUser };

    // // this allows for ssrConfig to be passed a callback function to perform more operations in server side props functions ie(charity page example).
    // const cbRes = cb
    //   ? await cb({ ...config, isAdmin, user, ctx })
    //   : { props: {} };

    // //@TODO: we may not need this anymore, but here for allow for redirect else where.
    // // checks if callback has redirect property and overides normal, behavior
    // if (cbRes.props.redirect) return cbRes.props;
    return {
      props: {
        // ...cbRes.props,
        myBand: config.myBand,
      },
    };
  } catch (error) {
    const GetCurrentClientResponse = await getMyBand(ctx);
    return {
      props: {
        corpId: GetCurrentClientResponse.data.getClient?.corpId || 'unknown',
        isAdmin: false,
        myClient: GetCurrentClientResponse.data.getClient,
        packageType: GetCurrentClientResponse.data.getClient?.packageType || '',
      },
    };
  }
};

export default ssrConfig;

import { Band } from '@my-bands-sites/shared-types';
import { NEXT_PUBLIC_CURRENT_BAND } from '@my-bands-sites/white-label-config';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

export type AppConfig = {
  // packageType: string;
  // bandId: number;
  // bandDomainName: string;
  myBand: Band;
};

// Builds dynamic config for application
export const buildConfig = async (ctx: GetServerSidePropsContext) => {
  try {
    const CurrentClientResponse: Band| void = await getMyBand(ctx);
    // const packageType =
    //   CurrentClientResponse.data.getClient?.packageType || 'base';
    // const corpId = CurrentClientResponse.data.getClient?.corpId;
    // const cmsName = CurrentClientResponse.data.getClient?.cmsName;
    // const cmsDomainName = CurrentClientResponse.data.getClient?.cmsDomainName;
    console.log('band', CurrentClientResponse);
    
    return {
    //   packageType,
    //   corpId,
    //   corpName: cmsName,
    //   corpDomainName: cmsDomainName,s
      myBand: CurrentClientResponse,
    } as AppConfig;
  } catch (error) {
    //allows us to return 404 if client isnt found
    return null;
  }
};

// Needed to grab custom url to match in dynamo DB (leave the colon!!!)
export const buildServerDomain = (ctx: GetServerSidePropsContext) => {
  if (process.env.NODE_ENV !== 'production') return NEXT_PUBLIC_CURRENT_BAND;
  // url forwarded by aws this is only place we receive actual domain!!!
  const url = ctx.req.headers['x-forwarded-host'] as string;

  const protocol = 'https:';
  const domain = `${protocol}//${url}`;
  if (url) {
    return domain;
  } else {
    return NEXT_PUBLIC_CURRENT_BAND;
  }
};

//used in hook no colon required
// export const buildDomain = (window: Window) => {
//   if (process.env.NODE_ENV !== 'production') return NEXT_PUBLIC_CURRENT_BAND;
//   // do not touch with out a ticket and a discussion with sr dev!!!
//   const host = window.location.hostname;
//   const protocol = window.location.protocol;
//   const domain = `${protocol}//${host}`;

//   if (domain) {
//     return domain;
//   } else {
//     return NEXT_PUBLIC_CURRENT_BAND;
//   }
// };

export const getMyBand = async (ctx: GetServerSidePropsContext) => {
  try {
    const { data } = await axios.get(
    `http://localhost:3001/bands/1`
  );
  console.log('data', data);
  
    return data;
  } catch (error) {
    throw new Error(
      `Error in get my client ssr config ${JSON.stringify(error)}`
    );
  }
};

// export const checkBlockedUser = (user: UserProfile) => {
//   if (user?.blocked) {
//     return {
//       redirect: {
//         destination: '/api/auth/logout',
//         permanent: false,
//       },
//     };
//   }
//   return null;
// };

export const handleNoConfig = () => {
  // return {
  //   redirect: {
  //     destination: '/404',
  //     permanent: false,
  //   },
  // };
};

// export const handleBasePackageRouting = (
//   config: AppConfig,
//   ctx: GetServerSidePropsContext
// ) => {
//   if (
//     (config.packageType === 'base' || config.packageType === 'ematch') &&
//     !ctx.resolvedUrl.includes('Admin') &&
//     ctx.resolvedUrl !== '/' &&
//     ctx.resolvedUrl !== '/Donate/Search' &&
//     !ctx.resolvedUrl.includes('Charity')
//   ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }
//   return null;
// };

// export const handleAdminPage = (
//   ctx: GetServerSidePropsContext,
//   isAdmin: boolean
// ) => {
//   if (ctx.resolvedUrl.includes('Admin') && !isAdmin) {
//     return {
//       redirect: {
//         destination: '/403',
//         permanent: false,
//       },
//     };
//   }
//   return null;
// };

// export const handleNoSession = (
//   config: AppConfig,
//   ctx: GetServerSidePropsContext
// ) => {
//   const clientOrg = config?.myClient?.auth0Metadata?.AUTH0_ORGANIZATION;
//   const returnTo = ctx.resolvedUrl;
//   return {
//     redirect: {
//       destination: `/api/auth/login?returnTo=${returnTo}&organization=${clientOrg}`,
//       permanent: false,
//     },
//   };
// };

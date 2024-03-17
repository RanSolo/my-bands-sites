import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Band } from './band-types';

export type Config = {
  bandId: string | number | null;
  myBand: Band;
  ctx: GetServerSidePropsContext;
};

export type ssrConfigCallBack = (
  config: Config
) => Promise<GetServerSidePropsResult<{ [key: string]: any }>>;

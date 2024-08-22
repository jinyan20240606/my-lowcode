
import { BASE_API_GITHUB_URL, BASE_GITHUB_URL, GITHUB_ID, GITHUB_SECRET } from './const';

import { methodV } from '../../utils/request';

/**
 * @description: 用code获取用户 token
 */
export const getGithubToken = async ({ code }) => {
  const pa = {
    client_id: GITHUB_ID,
    client_secret: GITHUB_SECRET,
    code,
  }
  const { data } = await methodV({
    baseUrl: BASE_GITHUB_URL,
    url: `login/oauth/access_token`,
    method: 'POST',
    params: pa,
  });
  console.log(data, '【执行getGithubToken】---成功')
  return data;
};

/**
 * @description: 用token 获取 Github 用户信息详情
 */
export const getGithubUser = async ({ token }) => {
  try {
    const { data } = await methodV({
      baseUrl: BASE_API_GITHUB_URL,
      url: `user`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log(data, '【执行getGithubUser】---成功')
    return data;

  } catch(e) {
    console.log(e.message, '【执行getGithubUser】-失败')
  }
 
};

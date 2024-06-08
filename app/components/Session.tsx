import { headers } from "next/headers";

export function Session({children}: any) {
  const headersList = headers();
  const authorization = headersList.get('authorization');
  console.log('session authorization', authorization);
  return (
    <div>
      {children}
    </div>
  );
}

/*
  웹브라우저에 토큰과 서버에서의 토큰을 비교하여 public이 없는 라우터에 전부 적용되어어 한다

  OR

  토큰 위조 한사람은 글쓰기를 어렵게 하기

*/
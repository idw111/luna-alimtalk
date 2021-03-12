# luna alimtalk

> 루나소프트의 알림톡을 보내기 위한 nodejs 라이브러리입니다.

## Install

```bash
npm install luna-alimtalk
```

## Example

```javascript
import Luna from 'luna-alimtalk';

const { sendWithAppUserId, sendWithPhone } = Luna(process.env.ALIMTALK_USERID, process.env.ALIMTALK_APIKEY);

const sendAlimtalk = async () => {
	const message = '[[service]]\n[nickname]님 안녕하세요.\n오늘 미세먼지는 [dust_state]입니다.';

	// send with kakao profile id to a single user
	await sendWithAppUserId('XXXXXXXX', 'YYYYY', message, { service: '날씨알리미', nickname: '김개똥', dust_state: '좋음' });
	// send with kakao profile id to multiple users
	await sendWithAppUserId(['XXXXXXXX1', 'XXXXXXXX2', 'XXXXXXXX3'], 'YYYYY', message, { service: '날씨알리미', nickname: '김개똥', dust_state: '좋음' });

	// send with phone number to a single user
	await sendWithPhone('010XXXXXXXX', 'YYYYY', message, { service: '날씨알리미', nickname: '김개똥', dust_state: '좋음' });
	// send with phone number to multiple users
	await sendWithPhone(['010XXXXXX1', '010XXXXXX2', '010XXXXXX3'], 'YYYYY', message, { service: '날씨알리미', nickname: '김개똥', dust_state: '좋음' });
};
```

## API

#### Luna(user_id, api_key)

-   **user_id** `string` 루나소프트에 알림톡 신청 시 발급.
-   **api_key** `string` 루나소프트에 알림톡 신청 시 발급.

#### sendWithAppUserId(contacts, template_id, message, params, btn_urls)

#### sendWithPhone(contacts, template_id, message, params, btn_urls)

-   **contacts** `string | string[]` 앱유저 아이디. sendWithAppUserId 이용 시 카카오 로그인 시 리턴되는 고유아이디. sendWithPhone 이용 시 사용자의 전화번호.
-   **template_id** `string` 템플릿 등록시 발급되는 아이디. 템플릿 목록 화면에서 확인할 수 있음.
-   **message** `string` 등록한 템플릿 메시지.
-   **params** `object` message에 들어갈 변수.
-   **btn_urls** `object | object[]`
    -   url_pc `string`
    -   url_mobile `string`

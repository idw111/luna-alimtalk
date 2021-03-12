const Luna = require('../lib');

describe('alimtalk', function () {
	it('should not return error on request', async function () {
		const { sendWithAppUserId, sendWithPhone } = Luna(process.env.API_USER, process.env.API_KEY);
		await sendWithAppUserId(
			process.env.TEST_APP_USER_ID,
			process.env.TEST_TEMPLATE_ID,
			process.env.TEST_MESSAGE,
			{
				service: '앱유저아이디로보내기',
				nickname: '닉네임',
			},
			{
				url_pc: process.env.TEST_URL,
				url_mobile: process.env.TEST_URL,
			}
		);
		await sendWithPhone(
			process.env.TEST_PHONE_NUMBER,
			process.env.TEST_TEMPLATE_ID,
			process.env.TEST_MESSAGE,
			{
				service: '전화번호로보내기',
				nickname: '닉네임',
			},
			{
				url_pc: process.env.TEST_URL,
				url_mobile: process.env.TEST_URL,
			}
		);
	});
});

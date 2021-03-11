const Luna = require('../lib').default;

describe('alimtalk', function () {
	it('should not return error on request', async function () {
		const { sendAlimtalk } = Luna(process.env.API_USER, process.env.API_KEY);
		await sendAlimtalk(
			process.env.TEST_USER,
			process.env.TEST_TEMPLATE_ID,
			process.env.TEST_MESSAGE,
			{
				url_pc: process.env.TEST_URL,
				url_mobile: process.env.TEST_URL,
			},
			{
				service: '서비스명',
				nickname: '닉네임',
			}
		);
	});
});

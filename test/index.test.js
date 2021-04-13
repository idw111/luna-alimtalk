const should = require('should');
const Luna = require('../lib');
const { getMessageWithParams, sendWithAppUserId, sendWithPhone } = Luna(process.env.API_USER, process.env.API_KEY);

describe('getMessageWithParams', function () {
	it('should return the same message when no params are given', function () {
		const message = '[service]\n[nickname] 님 안녕하세요.';
		const messageWithParams = getMessageWithParams(message);
		should(message).equal(messageWithParams);
	});

	it('should return the same message when empty param is givens', function () {
		const message = '[service]\n[nickname] 님 안녕하세요.';
		const messageWithParams = getMessageWithParams(message, {});
		should(message).equal(messageWithParams);
	});

	it('should return the same message when params has no relevant variables', function () {
		const message = '[service]\n[nickname] 님 안녕하세요.';
		const messageWithParams = getMessageWithParams(message, { test: 'test' });
		should(message).equal(messageWithParams);
	});

	it('should replace the [var] when params has relevant variables', function () {
		const message = '[[service]]\n[nickname] 님 안녕하세요.\n[service]';
		const messageWithParams = getMessageWithParams(message, { service: 'test', nickname: '하하하' });
		should('[test]\n하하하 님 안녕하세요.\ntest').equal(messageWithParams);
	});
});

describe('alimtalk', function () {
	it('should not return error on request', async function () {
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

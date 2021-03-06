import axios from 'axios';

interface ButtonUrl {
	url_pc: string;
	url_mobile: string;
}

interface MessageBasic {
	no: string;
	msg_content: string;
	use_sms: '0' | '1';
	btn_url?: ButtonUrl[];
}

interface UserId {
	app_user_id: string;
}

interface PhoneNumber {
	tel_num: string;
}

type MessageWithUserId = MessageBasic & UserId;

type MessageWithPhone = MessageBasic & PhoneNumber;

type Message = MessageWithUserId | MessageWithPhone;

type SendFunc = (contacts: string | string[], template_id: string, message: string, params?: { [key: string]: any }, urls?: ButtonUrl | ButtonUrl[]) => Promise<any>;

const api = (path: string): string => `https://jupiter.lunasoft.co.kr${path}`;

const toArray = <T>(something: T | T[]): T[] => (Array.isArray(something) ? something : [something]);

const getMessageWithParams = (message: string, params: { [key: string]: any } | undefined, options: { opening: string; closing: string } = { opening: '[', closing: ']' }): string => {
	if (!params) return message;
	return Object.keys(params).reduce((messageWithParams, key) => {
		let pos = null;
		let _message = messageWithParams;
		const pattern = `${options.opening}${key}${options.closing}`;
		const text = params[key];
		while ((pos = _message.indexOf(pattern)) !== -1) {
			_message = _message.substr(0, pos) + text + _message.substr(pos + pattern.length);
		}
		return _message;
	}, message);
};

const Luna = (
	userid: string,
	api_key: string
): {
	getMessageWithParams: (message: string, params: { [key: string]: any }) => string;
	sendWithAppUserId: SendFunc;
	sendWithPhone: SendFunc;
} => {
	const sendMessages = async (template_id: string, messages: Message[]) => {
		try {
			const { data } = await axios.post(
				api('/api/AlimTalk/message/send'),
				{
					userid,
					api_key,
					template_id,
					messages,
				},
				{
					headers: { 'Content-Type': 'application/json; charset=utf-8' },
				}
			);
			return data;
		} catch (err) {
			throw err;
		}
	};
	const sendWithAppUserId: SendFunc = async (contacts, template_id, message, params, urls) => {
		const getMessages = (contacts: string[], btn_url?: ButtonUrl[]): Message[] =>
			contacts.map((app_user_id, i) => {
				return {
					no: `${i}`,
					app_user_id,
					msg_content: getMessageWithParams(message, params),
					use_sms: '0',
					btn_url,
				};
			});
		if (!urls) console.warn('??????????????? ??????????????? ????????? ?????? ??? ??????????????? ???????????? ?????? ?????? ????????? ??????????????? ???????????? ???????????? ????????????.');
		await sendMessages(template_id, getMessages(toArray<string>(contacts), urls ? toArray<ButtonUrl>(urls) : urls));
	};
	const sendWithPhone: SendFunc = async (contacts, template_id, message, params, urls) => {
		const getMessages = (contacts: string[], btn_url?: ButtonUrl[]): Message[] =>
			contacts.map((tel_num, i) => {
				return {
					no: `${i}`,
					tel_num,
					msg_content: getMessageWithParams(message, params),
					use_sms: '0',
					btn_url,
				};
			});
		if (!urls) console.warn('??????????????? ??????????????? ????????? ?????? ??? ??????????????? ???????????? ?????? ?????? ????????? ??????????????? ???????????? ???????????? ????????????.');
		await sendMessages(template_id, getMessages(toArray<string>(contacts), urls ? toArray<ButtonUrl>(urls) : urls));
	};
	return {
		getMessageWithParams,
		sendWithAppUserId,
		sendWithPhone,
	};
};

export = Luna;

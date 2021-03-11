import axios from 'axios';
import template from 'lodash.template';

interface ButtonUrl {
	url_pc: string;
	url_mobile: string;
}

interface Message {
	no: string;
	app_user_id: string;
	msg_content: string;
	use_sms: '0' | '1';
	btn_url?: ButtonUrl[];
}

type SendFunc = (app_user_ids: string | string[], template_id: string, message: string, urls?: ButtonUrl, params?: { [key: string]: any }) => Promise<any>;

const api = (path: string): string => `https://jupiter.lunasoft.co.kr${path}`;

const Luna = (userid: string, api_key: string): { sendAlimtalk: SendFunc } => {
	const sendAlimtalk: SendFunc = async (app_user_ids, template_id, message, urls, params) => {
		const getMessages = (app_user_ids: string[], urls?: ButtonUrl): Message[] =>
			app_user_ids.map((app_user_id, i) => ({
				no: `${i}`,
				app_user_id,
				msg_content: template(message, { interpolate: /\[([a-zA-Z0-9]+?)\]/g })(params),
				use_sms: '0',
				btn_url: urls ? [urls] : [],
			}));
		try {
			const { data } = await axios.post(
				api('/api/AlimTalk/message/send'),
				{
					userid,
					api_key,
					template_id,
					messages: getMessages(Array.isArray(app_user_ids) ? app_user_ids : [app_user_ids], urls),
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
			return data;
		} catch (err) {
			throw err;
		}
	};
	return { sendAlimtalk };
};

export default Luna;

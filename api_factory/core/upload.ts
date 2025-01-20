import { GATEWAY_UPLOAD_ENDPOINT_WITH_AUTH } from '../axios.config'

export const core_apis = {
	// $_upload: (payload: any) => {
	// 	const url = '/upload/file'
	// 	return GATEWAY_UPLOAD_ENDPOINT_WITH_AUTH.post(url, payload)
	// },
	$_upload: (payload: any) => {
		const url = '/utilities/files'
		return GATEWAY_UPLOAD_ENDPOINT_WITH_AUTH.post(url, payload)
	},
	$_batch_upload: (payload: any) => {
		const url = '/utilities/files/batch'
		return GATEWAY_UPLOAD_ENDPOINT_WITH_AUTH.post(url, payload)
	},
}

export type ServerActionResponse<T> = Promise<{
  error?: string | undefined,
  data: T | null
}>

export function formDataBoolean(formData: FormData, key: string) {
  return formData.get(key) == "on"
}
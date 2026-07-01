import axios from 'axios'

export function getAxiosErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (error.response?.data.message || error.response?.data || error.message)
  }

  return 'unknown error'
}

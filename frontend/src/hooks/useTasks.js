import useSWR from 'swr';
import apiClient from '../api/axiosConfig';

const fetcher = (url) => apiClient.get(url).then((res) => res.data);

export function useTasks() {
    const { data, error, isLoading, mutate } = useSWR('/tasks', fetcher);

    return {
        tasks: data,
        isLoading,
        isError: error,
        mutate,
    }
}
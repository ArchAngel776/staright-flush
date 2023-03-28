export default interface Loader<Target>
{
    loadAsync(url: string, onProgress: ((event: ProgressEvent<EventTarget>) => void) | undefined): Promise<Target>
}
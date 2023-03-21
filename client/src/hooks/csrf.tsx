export default function csrf(): string | undefined
{
    const csrfMeta = document.querySelector<HTMLMetaElement>("meta[name=\"_csrf_token\"]")
    return csrfMeta ? csrfMeta.content : undefined
}
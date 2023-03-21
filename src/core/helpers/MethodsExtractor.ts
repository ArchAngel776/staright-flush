export default class MethodsExtractor<Target>
{
    protected target: Target

    protected methods: Array<keyof Target>

    protected primitivePrototype: boolean

    public constructor(target: Target)
    {
        this.target = target
        this.methods = []
        this.primitivePrototype = false
        this.onlyMethods = this.onlyMethods.bind(this)
    }

    public withPrimitive(primitivePrototype = true): this
    {
        this.primitivePrototype = primitivePrototype
        return this
    }

    public extract(): Array<keyof Target>
    {
        return this.methods.length ? this.methods : this.makeExtraction(this.target)
    }

    protected makeExtraction(target: Target): Array<keyof Target>
    {
        if (this.primitivePrototype && !target || !this.primitivePrototype && !Object.getPrototypeOf(target)) {
            return this.methods
        }

        const methods = <Array<keyof Target>> Object.getOwnPropertyNames(target)
        for (const method of methods.filter(this.onlyMethods)) {
            this.methods.push(method)
        }

        return this.makeExtraction(Object.getPrototypeOf(target))
    }

    protected onlyMethods(method: keyof Target): boolean
    {
        return this.target[method] instanceof Function && method !== "constructor"
    }
}
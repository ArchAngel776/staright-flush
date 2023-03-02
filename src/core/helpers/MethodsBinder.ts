import MethodsExtractor from "./MethodsExtractor"

export default class MethodsBinder<Target>
{
    protected target: Target

    public constructor(target: Target)
    {
        this.target = target
    }

    public bindMethods(methods: Array<keyof Target>): Target
    {
        for (const method of methods) {
            const methodFunction = this.target[method]
            if (methodFunction instanceof Function) {
                this.target[method] = methodFunction.bind(this.target)
            }
        }
        return this.target
    }

    public bindAllMethods(withPrimitive = false): Target
    {
        const methods = new MethodsExtractor(this.target).withPrimitive(withPrimitive).extract()
        return this.bindMethods(methods)
    }
}
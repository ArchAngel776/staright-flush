import TempalteParams from "@data/interfaces/TemplateParams"

import TemplateAction from "@foundations/TemplateAction"
import Hash from "@helpers/Hash"
import Method from "@helpers/Method"
import CsrfBind from "@decorators/actions/CsrfBind"

import assets from "@hooks/assets"


export default class SiteAction extends TemplateAction
{
    public template(): string
    {
        return assets("index.html")
    }

    public params(): TempalteParams
    {
        return {
            _csrf_token: this.createCsrfToken()
        }
    }

    @Method(CsrfBind)
    protected createCsrfToken(): string
    {
        return Hash.random(16)
    }
}
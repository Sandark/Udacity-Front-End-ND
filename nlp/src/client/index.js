import "core-js/stable";
import "regenerator-runtime/runtime";
import "./js/main";
import {postRequest} from "./js/httpRequest";
import {validUrl} from "./js/urlChecker";

import "./styles/global.scss";
import "./styles/base.scss";
import "./styles/buttons.scss";
import "./styles/results.scss";
import "./styles/loader.scss";

export {
    postRequest,
    validUrl
}
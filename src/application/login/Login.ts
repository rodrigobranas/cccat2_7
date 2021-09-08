import LoginOutput from "./LoginOutput";

export default class Login {

    constructor () {
    }

    execute(): LoginOutput {
        return new LoginOutput("123456");
    }
}
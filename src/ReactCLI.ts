import {CLI, Reader, Writter} from "@makechtec/tezcatl-cli";
import {ConditionalProcessor} from "@makechtec/tezcatl-conditional-processor";
import { IterativeProcessor } from "@makechtec/tezcatl-iterative-processor";
import {Pipe} from "@makechtec/pipe";

export const run = function(){

    let component = CLI.getArgumentValue(ARGS.component);
    let template = CLI.getArgumentValue(ARGS.template);
    let targetDir = CLI.getArgumentValue(ARGS.targetDir);
    let placeholders = CLI.getAllArguments();
    let file = CLI.getArgumentValue(ARGS.file);
    let ext = EXTENSION;
    
    if(CLI.isFlag(FLAGS.js)){
        ext = EXTENSION_JS;
    }

    if(template == ""){
        template = DEFAULT_TEMPLATE;
    }

    if(file == ""){
        file = component;
    }

    let fileName = targetDir + "/" + file + ext;
    let content = Reader.readTemplate(template);
    let conditionalProcessor = new ConditionalProcessor();
    let iterativeProcessor = new IterativeProcessor();
    let pipe = new Pipe(content);

    pipe.addAction((newContent) => {
        return conditionalProcessor.parse(newContent);
    })
    .addAction((newContent) => {
        return iterativeProcessor.parse(newContent);
    })
    .addAction((newContent) => {
        return Reader.changePlaceholders(newContent, placeholders);
    })
    .addAction((newContent) => {
        Writter.writeFile(fileName, newContent);
    })
    .execActions();
};

export const ARGS = {
    component: "com",
    template: "temp",
    targetDir: "dir",
    file: "file",
};

export const FLAGS = {
    js: "js",
};

export const COMPONENT = "c";
export const TEMPLATE = "t";
export const DEFAULT_TEMPLATE = "react-component";
export const EXTENSION_JS = ".js";
export const EXTENSION = ".jsx";
export const MULTI_EXPORTS = "multi";
export const FUNCTION_PREFIX = "fn";
export const CONSTANT_PREFIX = "const";

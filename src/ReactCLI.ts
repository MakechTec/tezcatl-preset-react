import {CLI, Reader, Writter} from "@makechtec/tezcatl-cli";
import {TEMPLATE_EXTENSION} from "@makechtec/tezcatl-constants";
import {ConditionalProcessor} from "@makechtec/tezcatl-conditional-processor";
import { IterativeProcessor } from "@makechtec/tezcatl-iterative-processor";
import {Pipe} from "@makechtec/pipe";
import {cwd} from "node:process";

export const run = function(){

    let component = CLI.getArgumentValue(ARGS.component);
    let template = CLI.getArgumentValue(ARGS.template);
    let targetDir = CLI.getArgumentValue(ARGS.targetDir);
    let placeholders = CLI.getAllArguments();
    let file = CLI.getArgumentValue(ARGS.file);
    let ext = CLI.getArgumentValue(ARGS.ext);
    
    if(ext.value == ""){
        ext.value = EXTENSION;
    }

    if(template.value == ""){
        template.value = DEFAULT_TEMPLATE;
    }

    if(file.value == ""){
        file.value = component.value;
    }

    let fileName = targetDir.value + "/" + file.value + ext.value;
    let content = readContent(template.value + TEMPLATE_EXTENSION);
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

export const readContent = (templateName: string) => {
    let userTemplatePath = USER_TEMPLATE_DIR + "/" + templateName;
    let defaultTemplatePath = DEFAULT_TEMPLATE_DIR + "/" + templateName;
    let content = Reader.readTemplate(userTemplatePath);

    if(content == ""){
        content = Reader.readTemplate(defaultTemplatePath);
    }
    return content;
};

export const ARGS = {
    component: "com",
    template: "temp",
    targetDir: "dir",
    file: "file",
    ext: "ext",
};

export const DEFAULT_TEMPLATE = "react-component";
export const EXTENSION = ".jsx";
export const USER_TEMPLATE_DIR = cwd() + "/templates";
export const DEFAULT_TEMPLATE_DIR = cwd() + "/node_modules/@makechtec/tezcatl-preset-react/templates";

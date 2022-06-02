import CLI, {Reader, Writter} from "@makechtec/tezcatl-cli";
import Pipe from "@makechtec/pipe";
import BlockExtractor from "@makechtec/tezcatl-blocks";

export const ReactCLI = {
    run: function() {

        let component = CLI.getArgumentValue(reactConstants.COMPONENT);
        let content = Reader.readTemplate(reactConstants.TEMPLATE);
        let p = new Pipe(content);

        p.addAction((content) => {
            return BlockExtractor.processConditions(content);
        })
        .addAction((content) => {
            return BlockExtractor.processIterations(content);
        })
        .addAction((content, placeholders) => {
            return Reader.changePlaceholders(content, placeholders);
        }, CLI.getAllArguments())
        .addAction((content, filename) => {
            return Writter.writeFile(filename, content);
        }, component.value + reactConstants.EXTENSION);

        p.execActions();
    }
};

export default ReactCLI;


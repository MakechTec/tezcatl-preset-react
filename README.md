# tezcatl-preset-react #

### Installation ###

    $ npm install @makechtec/tezcatl-preset-react --save-dev

In your tezcatl.config.json file, add the following:

    {
        "preset": "react"
    }

### Usage ###

    $ tezcatl com=Navbar // more args ...

### options ###

    - ext: string, default: .jsx // extension of the file it must start with a dot
    - dir: string, default: ./ // directory where the file is exported
    - temp: string, default: react-component // name of the template
    - file: string, default: (same value of com argument) // name of the file to create
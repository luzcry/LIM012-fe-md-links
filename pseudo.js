main() {
    let path = "node.md";
    let result;
    const isMd = path.extname(path) === "md";
    const isDir = false;
    if (isMd) { //como sacar links de un archivo md node
        result = getLinks(path) //arreglo con los links
    } else if (isDir) { //si es una carpeta como saber si el path es una carpeta
        const mdFiles = getMdFiles(path); //recorrer toda la carpeta recursivamente encontrando todos los path de los archivos md
        const links = mdFiles.array.forEach(file => {
            return getLinks(file)
        });
        result = [...links]
    } else {
        throw Error;
    };
};
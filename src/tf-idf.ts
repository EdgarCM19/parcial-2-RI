type objNoticia = { id: number, title: string, content: string };
type objTFIDF = { id: number, term: string, weights: number[] };
type objDocWeight = { id: number, weight: number };

const stop_words:string[] = ['a', 'acá', 'ahí', 'ajena', 'ajeno', 'ajenas', 'ajenos', 'al', 'algo', 'algún', 'alguna', 
    'alguno', 'algunas', 'algunos', 'allá', 'allí', 'ambos', 'ante', 'antes', 'aquel', 'aquella', 'aquello', 'aquellas', 
    'aquellos', 'aquí', 'arriba', 'así', 'atrás', 'aun', 'aunque', 'bajo', 'bastante', 'bien', 'cabe', 'cada', 'casi',
    'cierto', 'cierta', 'ciertos', 'ciertas', 'como', 'con', 'conmigo', 'conseguimos', 'conseguir', 'consigo', 'consigue',
    'consiguen', 'consigues', 'contigo', 'contra', 'cual', 'cuales', 'cualquier', 'cualquiera', 'cualquieras', 'cuan',
    'cuando', 'cuanto', 'cuanta', 'cuantas', 'de', 'dejar', 'del', 'demás', 'demasiada', 'demasiado', 'demasiadas',
    'demasiados', 'dentro', 'desde', 'donde', 'dos', 'el', 'él', 'ella', 'ello', 'ellas', 'ellos', 'empleáis', 'emplean',
    'emplear', 'empleas', 'empleo', 'en', 'encima', 'entonces', 'entre', 'era', 'eras', 'eramos', 'eran', 'eres', 'es', 
    'esa', 'ese', 'eso', 'esas', 'esos', 'esta', 'sestas', 'estaba', 'estado', 'estáis', 'estamos', 'están', 'estar', 
    'este', 'esto', 'estos', 'estoy', 'etc', 'fin', 'fue', 'fueron', 'fui', 'fuimos', 'gueno', 'ha', 'hace', 'haces', 
    'hacéis', 'hacemos', 'hacen', 'hacer', 'hacia', 'hago', 'hasta', 'incluso', 'intenta', 'intentas', 'intentáis', 
    'intentamos', 'intentan', 'intentar', 'intento', 'ir', 'jamás', 'junto', 'juntos', 'la', 'lo', 'las', 'los', 'largo', 
    'más', 'me', 'menos', 'mi', 'mis', 'mía', 'mías', 'mientras', 'mío', 'míos', 'misma', 'mismo', 'mismas', 'mismos', 
    'modo', 'mucha', 'muchas', 'muchísima', 'muchísimo', 'muchísimas', 'muchísimos', 'mucho', 'muchos', 'muy', 'nada', 
    'ni', 'ningún', 'ninguna', 'ninguno', 'ningunas', 'ningunos', 'no', 'nos', 'nosotras', 'nosotros', 'nuestra', 
    'nuestro', 'nuestras', 'nuestros', 'nunca', 'os', 'otra', 'otro', 'otras', 'otros', 'para', 'parecer', 'pero', 
    'poca', 'poco', 'pocas', 'pocos', 'podéis', 'podemos', 'poder', 'podría', 'podrías', 'podríais', 'podríamos', 
    'podrían', 'por', 'por qué', 'porque', 'primero', 'puede', 'pueden', 'puedo', 'pues', 'que', 'qué', 'querer', 
    'quién', 'quiénes', 'quienesquiera', 'quienquiera', 'quizá', 'quizás', 'sabe', 'sabes', 'saben', 'sabéis', 'sabemos', 
    'saber', 'se', 'según', 'ser', 'si', 'sí', 'siempre', 'siendo', 'sin', 'sino', 'so', 'sobre', 'sois', 'solamente', 
    'solo', 'sólo', 'somos', 'soy', 'sr', 'sra', 'sres', 'sta', 'su', 'sus', 'suya', 'suyo', 'suyas', 'suyos', 'tal', 
    'tales', 'también', 'tampoco', 'tan', 'tanta', 'tanto', 'tantas', 'tantos', 'te', 'tenéis', 'tenemos', 'tener', 
    'tengo', 'ti', 'tiempo', 'tiene', 'tienen', 'toda', 'todo', 'todos', 'tomar', 'trabaja', 'trabajo', 'trabajáis', 
    'trabajamos', 'trabajan', 'trabajar', 'trabajas', 'tras', 'tú', 'tu', 'tus', 'tuya', 'tuyo', 'tuyas', 'tuyos', 
    'último', 'ultimo', 'un', 'una', 'uno', 'unas', 'unos', 'usa', 'usas', 'usáis', 'usamos', 'usan', 'usar', 'uso', 
    'usted', 'ustedes', 'va', 'van', 'vais', 'valor', 'vamos', 'varias', 'varios', 'vaya', 'verdadera', 'vosotras', 
    'vosotros', 'voy', 'vuestra', 'vuestro', 'vuestras', 'vuestros', 'y', 'ya', 'yo'];

//Funcion que convierte la entrada (archivo de texto) en un arreglo de objet
//Separa el indice de la noticis, el titulo y su contenido.


const getCorpus = (input: string): objNoticia[] => {
    const documents = input.split('\n');
    const corpus: objNoticia[] = [];
    for(const document of documents){
        const [id, text] = document.split('$');
        const document_id = parseInt(id.slice(7).trim());
        const separator = text.indexOf('.');
        const document_title = text.slice(0, separator).trim();
        const document_content = text.slice(separator + 1).trim();
        corpus.push({
            id: document_id, 
            title: document_title,
            content: document_content
        });
    }
    return corpus;
}

const preprocessDocument = (document: string): string => {
    return removeStopWords(lexicalAnalysis(document), stop_words);
}

const lexicalAnalysis = (document: string): string => {
    let temp = document.toLowerCase();
    //Eliminar signos de puntuacion y numeros
    temp = temp.replace(/[.,/#!¡¿?$%^&*;:+{}=-_`~()“”'"]/g, '').replace(/[0-9]+/g, '');
    //Convertir a minusculas
    return temp;
}

const removeStopWords = (document: string, stop_words: string[]): string => {
    return document.split(' ').filter(e => !stop_words.includes(e)).join(' ');
}

const getWords = (corpus: objNoticia[]): string[] => {
    const words = new Set<string>();
    //Recorrer el arreglo, cada documento mandarlo a preprocesar
    for(const document of corpus)
        preprocessDocument(document.title + ' ' + document.content).split(' ').
                forEach(e => {
                    words.add(e); 
        });
    //Separar el documento por espacios y agregar las palabras en el set
    return Array.from(words);
}

const get_tf_idf = (corpus: objNoticia[], words: string[]): objTFIDF[] => {
    const f = get_f(corpus, words);
    const tf=get_tf(f);
    const idf = get_idf(f,words);
    const temp: objTFIDF[] = [];
    for(let i = 0; i < idf.length; i++)
        if(words[i] !== ' ')
        temp.push({
            id: i,
            term: words[i],
            weights: tf[i].map(x => {
                let num = x * idf[i][1];
                num = Number.isInteger(num) ? num : parseFloat(num.toFixed(3));
                return num;
            }),
        });
    return temp;
}

const get_f = (corpus: objNoticia[], words: string[]): number[][] => {
    const f: number[][] = [];
    for(const word of words)
        f.push(ocurrencesInCorpus(word, corpus));
    return f;
}
const ocurrencesInCorpus = (word: string, corpus: objNoticia[]): number[]=> {
    const arr: number[] = [];
    for(const document in corpus)
        arr.push(ocurrencesInDocument(word,corpus[document].title + ' ' + corpus[document].content));
    return arr;
}
const ocurrencesInDocument = (word: string, document: string): number => {
    let cont = 0;
    for(const w of preprocessDocument(document).split(' '))
        if(word === w.toLowerCase())
            cont++;
    return cont;
} 

const get_tf=(f: number[][]): number[][] =>  {
    const tf: number[][] = [];
    for(let i = 0; i < f.length; i++){
        tf.push(getWordFT(f[i]));
    }
    return tf;
}

const ft=(n:number): number =>{
    if(n <= 0) return 0;
    const res= (1 + Math.log2(n));
    return Number.isInteger(res) ? res : parseFloat(res.toFixed(3));
}  

const getWordFT = (array_frec:number[]): number[] => {
    return array_frec.map(ft);
}

const get_idf = (f: number[][],words: string[]): number[][] => {
    const idf: number[][] = [];
    for(let i = 0; i < f.length; i++){
        idf.push(getWordIDF(f[i]));
    }
    return idf;
}

const getWordIDF=(array_frec:number[]):number[]=>{
    const docs_appearances = array_frec.filter(x => x > 0).length;
    const idf_arr: number [] = [];
    idf_arr.push(docs_appearances);
    const idf_log = Math.log2(array_frec.length / docs_appearances);
    idf_arr.push(Number.isInteger(idf_log) ? idf_log : parseFloat(idf_log.toFixed(3)));
    return idf_arr;
}

const getDocumentWeight = (weights: number[]): number => {
    return weights.reduce((prev, current) => prev + current);
}

const getQueryWeights = (query_weights: objTFIDF[]): objDocWeight[] => { 
    const temp: objDocWeight[] = [];
    let cont = 0;
    for(let i = 0; i < query_weights[0].weights.length; i++){
        for(let j = 0; j < query_weights.length; j++)
            cont += query_weights[j].weights[i];
        temp.push({ id: i, weight: cont});
        cont = 0;
    }

    return temp;
}

export {objNoticia, objDocWeight, getCorpus, getWords, preprocessDocument, get_f, get_tf, get_idf, get_tf_idf, getDocumentWeight, getQueryWeights, objTFIDF}
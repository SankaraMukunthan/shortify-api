const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const Url = require('../models/url');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const urlController = {
    async findAllByUser (req,res) {
        const {page =1, perPage=10}= req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10),
        }
        Url.paginate({}, options).then(urls => res.json(urls)).catch(err => res.status(INTERNAL_SERVER_ERROR).json(err));
    },
    async createShortenUrl (req,res) {
        const {longUrl}= req.body;
        const baseUrl = config.get('baseUrl');
    
        // create url code
        const urlCode = shortId.generate();
    
        // check long url
        if(validUrl.isUri(longUrl)){
            try {
                // find if its a existing url
                let url = await Url.findOne({longUrl});
    
                if(url){
                    res.json(url);
                }else {
                    // create short url
                    const shortUrl = baseUrl+'/'+urlCode;
    
                    url = new Url({
                        longUrl,
                        shortUrl,
                        urlCode,
                        date: new Date()
                    });
    
                    await url.save();
                    res.json(url);
                }
            } catch (error) {
                console.error(error);
                res.status(500).json('Server error');
            }
        }else{
            // If url is not valid
            res.status(401).json('Invalid long url');
        };
    }

}

module.exports= urlController;
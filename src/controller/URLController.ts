import {Request, response, Response} from 'express'
import { URLModel } from '../models/URL'
import shortId from 'shortid'
import {config} from '../config/Constants'

export class URLController {

    public async shorten(req: Request, res: Response): Promise<void>{
        //identificar se URL existe
        const { originURL } = req.body
        const url = await URLModel.findOne({originURL})
        if(url){
            res.json(url)
            return
        }
        //Criar hash para URL
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`

        //Salvar URL na base de dados
        const newurl = URLModel.create({ hash, shortURL, originURL })
        //Retornar URL salva
        res.json(newurl)

    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //Pegar o hash da URL
        const { hash } = req.params
        const url = await URLModel.findOne({ hash })
        
        //Encontrar a URL original
       if(url){
        res.redirect(url.originURL)
        return
       }
        res.status(400).json({error: "URL not found"})
       


        
    }

}
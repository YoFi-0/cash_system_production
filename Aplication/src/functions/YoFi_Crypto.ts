import Crypto from "crypto"
type KeyIvType = {
    key:string,
    iv:string
}

class Auth_Secure_With_Random {
    private allKeyIv:KeyIvType[] = []
    private prefix = "Mlci"
    private prefix2 = "ชয२ౡយన"
    private prefixMinLen = "!<==!0!==>!"
    private customLang = "ชয२ਰ४អটჷནუए়នûந১८एأģԹ౯ౡយన ขउएஓអਡôល्শ"
    constructor (...args:KeyIvType[]){
        for(let key of args){
           this.allKeyIv.push(this.getKeyAndIv(key.key, key.iv))
        }
    }
    private splitThree (text:string):string[] {
        const multBly = this.allKeyIv.length <= 3 ? 1.75 : (1.75 + (Number(`0.${this.allKeyIv.length}`)**this.allKeyIv.length))
        const minLen = Math.trunc(this.allKeyIv.length * multBly)
        if(text.length < minLen){
            text += this.prefixMinLen + Crypto.randomBytes(minLen)
        }
        var l = 0
        const list:string[] = []
        var ram = ""
        const splterNum = (text.length / this.allKeyIv.length)
        text.split("").forEach((value, i) => {
            l++
            if(l >= splterNum){
                l = 0
                ram += value
                list.push(ram)
                ram = ""
            } else {
                ram += value
            }
            if(i == text.length - 1){
                if(ram.length != 0){
                    list.push(ram)
                }
            }
        })
        return list
    }
    private getKeyAndIv(secret_key:string, secret_iv:string):KeyIvType  {
        const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substring(0, 32)
        const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substring(0, 16)
        return {
            key:key,
            iv:iv,
        }
    }
    private en_code_func(msg:string, key:string, iv:string, from:Crypto.Encoding, final:Crypto.Encoding){
        const cipherIvObject = Crypto.createCipheriv('AES-256-CBC', key, iv);
        const enCodeMsdg = `${cipherIvObject.update(msg, from, final)}${cipherIvObject.final(final)}`;
        return Buffer.from(enCodeMsdg).toString(final);
    }
    private de_code_func = (ecnCodeMsg:string, key:string, iv:string, from:Crypto.Encoding, final:Crypto.Encoding) => {
        const buffer = Buffer.from(ecnCodeMsg, from)
        const stringBuffer = buffer.toString(final);
        var decoder = Crypto.createDecipheriv('AES-256-CBC', key, iv)
        const finalDEcode = `${decoder.update(stringBuffer, from, final)}${decoder.final(final)}`
        return finalDEcode
    }
    private async en_code (text:string, keyIv:KeyIvType):Promise<string | false>{
        return await new Promise(async(r) => {
            try{
                const enCodone = this.en_code_func(text, keyIv.key, keyIv.iv, 'utf-8', 'base64')
                r(enCodone)
            } catch(err){
                console.log(err)
                r(false)
            }
        })
    }
    private async de_code (enCode_text:string, keyIv:KeyIvType):Promise<string | false>{
        return await new Promise(async(r) => {
            try{
                const deCodeOne = this.de_code_func(enCode_text, keyIv.key, keyIv.iv, 'base64', 'utf-8')
                r(deCodeOne)
            } catch(err){
                console.log(err)
                r(false)
            }
        })
    }
    public async createMistry (text:string){
        const listText = this.splitThree(text)
        const fainalArray = []
        var i = 0
        for(let text of listText){
            const encode = await this.en_code(text, this.allKeyIv[i])
            if(!encode){
                throw Error("somthing is wrong with my algu")
            }
            fainalArray.push(encode)
            i++
        }
        const finalText = fainalArray.join(this.prefix)
        return this.createRandomLang(finalText.length) + this.prefix2 + finalText + this.prefix2 + Crypto.randomBytes(finalText.length).toString("base64") + this.prefix + this.createRandomLang(finalText.length)
    }
    public async viewMistry (text:string){
        const listText = text.split(this.prefix2)[1].split(this.prefix)
        const fainalArray = []
        var i = 0
        for(let text of listText){
            const encode = await this.de_code(text, this.allKeyIv[i])
            if(!encode){
                throw Error("somthing is wrong with my algu")
            }
            fainalArray.push(encode)
            i++
        }
        const finalText = fainalArray.join("")
        return finalText.includes(this.prefixMinLen) ? finalText.split(this.prefixMinLen)[0] : finalText
    }
    public createRandomLang(len:number) {
        const allLagnsLettrs = [
            "ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸàâæçéèêëîïôœùûüÿ",
            "БТжчасИксдокторргтыгяZпгФЧАСДж",
            "ءأبتثجحخدذرزسشصطضعغفقكلمنهوي",
            "एबीटीडब्ल्यूसीएचएक्सडॉवाईआरजीएसयूएसजेडजेडपीजीएफएसककोएमएनएचऔरजे私",
            "অআকাকিকীউকুঊকূঋকৃএকেঐকৈওকোঔকৌক্কত্‍কংকঃকঁকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরৰলৱশষসহয়ড়ঢ়০১২৩৪৫৬৭৮৯",
            "अआइईउऊऋॠऌॡऍऎएऐऑऒओओकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसह०१२३४५६७८९प्पँपंपःप़पऽ",
            "ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹ",
            "ཀཁགངཅཆཇཉཏཐདནཔཕབམཙཚཛཝཞཟའཡརལཤསཧཨ",
            "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមសហយរលឡអវអ្កអ្ខអ្គអ្ឃអ្ងអ្ចអ្ឆអ្ឈអ្ញអ្ឌអ្ឋអ្ឌអ្ឃអ្ណអ្តអ្ថអ្ទអ្ធអ្នអ្បអ្ផអ្ពអ្ភអ្មអ្សអ្ហអ្យអ្រអ្យអ្លអ្អអ្វអក្សរខ្មែរ",
            "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ",
            "აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵჶჷჸ",
            "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะา฿เแโใไๅๆ๏๐๑๒๓๔๕๖๗๘๙๚๛",
            "āčēģīķļņōŗšūž",
            "國會這來對開關門時個書長萬邊東車愛兒",
            " ា ិ ី ឹ ឺ ុ ូ ួ ើ ឿ ៀ េ ែ ៃ េា ៅ ុំ ំ ាំ ះ ុះ េះ ោះ",
            "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔԵՎևՕՖ",
            "აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵჶჷჸ",
            "அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன",
            "అఆఇఈఉఊఋౠఌౡఎఏఐఒఓఔఅంఅఃకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహ౦౧౨౩౪౫౬౭౮౯",
            "কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎঃং",
        ].join("")
        var finalString = ""
        for(let i = 0; i < len; i++){
            finalString += allLagnsLettrs[Math.trunc(Math.random() * allLagnsLettrs.length)]
        }
        return finalString
    }
}


class Auth_Secure_No_Random {
    private allKeyIv:KeyIvType[] = []
    private prefix = "Mlci"
    private prefix2 = "ชয२ౡយన"
    private prefixMinLen = "!<==!0!==>!"
    private customLang = "ชয२ਰ४អটჷནუए়នûந১८एأģԹ౯ౡយన ขउएஓអਡôល्শ"
    constructor (...args:KeyIvType[]){
        for(let key of args){
           this.allKeyIv.push(this.getKeyAndIv(key.key, key.iv))
        }
    }
    private splitThree (text:string):string[] {
        const multBly = this.allKeyIv.length <= 3 ? 1.75 : (1.75 + (Number(`0.${this.allKeyIv.length}`)**this.allKeyIv.length))
        const minLen = Math.trunc(this.allKeyIv.length * multBly)
        if(text.length < minLen){
            text += this.prefixMinLen + Crypto.randomBytes(minLen)
        }
        var l = 0
        const list:string[] = []
        var ram = ""
        const splterNum = (text.length / this.allKeyIv.length)
        text.split("").forEach((value, i) => {
            l++
            if(l >= splterNum){
                l = 0
                ram += value
                list.push(ram)
                ram = ""
            } else {
                ram += value
            }
            if(i == text.length - 1){
                if(ram.length != 0){
                    list.push(ram)
                }
            }
        })
        return list
    }
    private getKeyAndIv(secret_key:string, secret_iv:string):KeyIvType  {
        const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substring(0, 32)
        const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substring(0, 16)
        return {
            key:key,
            iv:iv,
        }
    }
    private en_code_func(msg:string, key:string, iv:string, from:Crypto.Encoding, final:Crypto.Encoding){
        const cipherIvObject = Crypto.createCipheriv('AES-256-CBC', key, iv);
        const enCodeMsdg = `${cipherIvObject.update(msg, from, final)}${cipherIvObject.final(final)}`;
        return Buffer.from(enCodeMsdg).toString(final);
    }
    private de_code_func = (ecnCodeMsg:string, key:string, iv:string, from:Crypto.Encoding, final:Crypto.Encoding) => {
        const buffer = Buffer.from(ecnCodeMsg, from)
        const stringBuffer = buffer.toString(final);
        var decoder = Crypto.createDecipheriv('AES-256-CBC', key, iv)
        const finalDEcode = `${decoder.update(stringBuffer, from, final)}${decoder.final(final)}`
        return finalDEcode
    }
    private async en_code (text:string, keyIv:KeyIvType):Promise<string | false>{
        return await new Promise(async(r) => {
            try{
                const enCodone = this.en_code_func(text, keyIv.key, keyIv.iv, 'utf-8', 'base64url')
                r(enCodone)
            } catch(err){
                console.log(err)
                r(false)
            }
        })
    }
    private async de_code (enCode_text:string, keyIv:KeyIvType):Promise<string | false>{
        return await new Promise(async(r) => {
            try{
                const deCodeOne = this.de_code_func(enCode_text, keyIv.key, keyIv.iv, 'base64url', 'utf-8')
                r(deCodeOne)
            } catch(err){
                console.log(err)
                r(false)
            }
        })
    }
    public async createMistry (text:string){
        const listText = this.splitThree(text)
        const fainalArray = []
        var i = 0
        for(let text of listText){
            const encode = await this.en_code(text, this.allKeyIv[i])
            if(!encode){
                throw Error("somthing is wrong with my algu")
            }
            fainalArray.push(encode)
            i++
        }
        const finalText = fainalArray.join(this.prefix)
        return  finalText
    }
    public async viewMistry (text:string){
        const listText = text.split(this.prefix)
        const fainalArray = []
        var i = 0
        for(let text of listText){
            const encode = await this.de_code(text, this.allKeyIv[i])
            if(!encode){
                throw Error("somthing is wrong with my algu")
            }
            fainalArray.push(encode)
            i++
        }
        const finalText = fainalArray.join("")
        return finalText.includes(this.prefixMinLen) ? finalText.split(this.prefixMinLen)[0] : finalText
    }
    public createRandomLang(len:number) {
        const allLagnsLettrs = [
            "ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸàâæçéèêëîïôœùûüÿ",
            "БТжчасИксдокторргтыгяZпгФЧАСДж",
            "ءأبتثجحخدذرزسشصطضعغفقكلمنهوي",
            "एबीटीडब्ल्यूसीएचएक्सडॉवाईआरजीएसयूएसजेडजेडपीजीएफएसककोएमएनएचऔरजे私",
            "অআকাকিকীউকুঊকূঋকৃএকেঐকৈওকোঔকৌক্কত্‍কংকঃকঁকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরৰলৱশষসহয়ড়ঢ়০১২৩৪৫৬৭৮৯",
            "अआइईउऊऋॠऌॡऍऎएऐऑऒओओकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसह०१२३४५६७८९प्पँपंपःप़पऽ",
            "ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹ",
            "ཀཁགངཅཆཇཉཏཐདནཔཕབམཙཚཛཝཞཟའཡརལཤསཧཨ",
            "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមសហយរលឡអវអ្កអ្ខអ្គអ្ឃអ្ងអ្ចអ្ឆអ្ឈអ្ញអ្ឌអ្ឋអ្ឌអ្ឃអ្ណអ្តអ្ថអ្ទអ្ធអ្នអ្បអ្ផអ្ពអ្ភអ្មអ្សអ្ហអ្យអ្រអ្យអ្លអ្អអ្វអក្សរខ្មែរ",
            "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ",
            "აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵჶჷჸ",
            "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะา฿เแโใไๅๆ๏๐๑๒๓๔๕๖๗๘๙๚๛",
            "āčēģīķļņōŗšūž",
            "國會這來對開關門時個書長萬邊東車愛兒",
            " ា ិ ី ឹ ឺ ុ ូ ួ ើ ឿ ៀ េ ែ ៃ េា ៅ ុំ ំ ាំ ះ ុះ េះ ោះ",
            "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔԵՎևՕՖ",
            "აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵჶჷჸ",
            "அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன",
            "అఆఇఈఉఊఋౠఌౡఎఏఐఒఓఔఅంఅఃకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహ౦౧౨౩౪౫౬౭౮౯",
            "কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎঃং",
        ].join("")
        var finalString = ""
        for(let i = 0; i < len; i++){
            finalString += allLagnsLettrs[Math.trunc(Math.random() * allLagnsLettrs.length)]
        }
        return finalString
    }
}




export const auth_secure_no_random = new Auth_Secure_No_Random(
    {
        iv:"qwduygqow8udih615845WDSW@#@",
        key:"qwdouhoiuoqwjdpiuDEWDQq",
    },
    {
        iv:"qwtfugSDWQDWQdouhعغتليهضعخصي",
        key:"qwjdyguADWWQDQWDQrty7678",
    },
    {
        iv:"ضصهيغلضهاخصتي‘لإ[[‘،إلأشغلصياهخضصايًعغتلضصيهاغتضاصليهاضعصqywjdgqwdhgqwd",
        key:"qwduyghqwd2554",
    },
    {
        iv:"qwidyg8qiuwhdioyWDWF$ED25563",
        key:"624865WDEFDjkggyh",
    },
    {
        iv:"qwdjg,lkhw#%#$#ljk2978u",
        key:"qwiydg8ohuWE#$#@",
    },
)

export const auth_secure = new Auth_Secure_With_Random(
    {
        iv:"gqlh;oidhquydglhq;@#@365956",
        key:"kuygodiuqdougyqwduySDW5",
    },
    {
        iv:"qwldyguiuhhWD QWeouhilygwd157غاصلتيا",
        key:"qwudfugqwdSDW5584qytjyghqwd",
    },
    {
        iv:"ضصهعيهخضصيuyqwdgihoWDWD68554",
        key:"qwldiuhoiqASCQWDq",
    },
    {
        iv:"155685qwdjgyh",
        key:"noiuqwdhASQWDQWD",
    },
    {
        iv:"qiwygdoiuhj[oigu54845wd",
        key:"qyiwgdihQDQWDQ65958",
    },
)


export const error_encoder = new Auth_Secure_No_Random(
    {
        iv:"kqywdguihWDDW@#@",
        key:"liygoihهغلضصياه",
    },
    {
        iv:"ضهصغيلخهاهعشلاهخيصعاضصيعغiugawiudygqlw",
        key:"lahgwdoiuw156265fewjhnلانعغلصعي",
    },
    {
        iv:"kuyhghQWDQ;wieufgoiluلابهضناياكمنتانعغمهختضص غعا",
        key:"ضصيتالبنعلغتضصيطهخعله8ضصغيامهعضصلينعغلاضصيمهعبضصهيغعىز ىنلخهاywqgdoiu",
    },
)
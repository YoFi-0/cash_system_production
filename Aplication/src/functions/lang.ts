import { Interaction } from "discord.js"
export const get_lang_by_msg = (interaction:Interaction<any>):"en" | "ar" => {
    try{
        const arabic_regxp = /[ء-ي]/
        const english_test = "english_test"
        if(interaction.isButton() || interaction.isSelectMenu() || interaction.isModalSubmit()){
            if(!interaction.message){
                return "en"
            }
            const intarction_msg = interaction.message.content
            if(arabic_regxp.test(intarction_msg || english_test)){
                return "ar"
            }
            if(interaction.message.components){
                if(interaction.message.components[0]?.components[0]){
                    const button_lable = (interaction.message.components[0]?.components[0]?.data as any)?.label
                    if(arabic_regxp.test(button_lable || english_test)){
                        return "ar"
                    }
                }
            }
            if(interaction.message.embeds){
                const embid_Title = interaction.message.embeds[0]?.title
                if(arabic_regxp.test(embid_Title || english_test)){
                    return "ar"
                }
                const embid_disc = interaction.message.embeds[0]?.description
                if(arabic_regxp.test(embid_disc || english_test)){
                    return "ar"
                }
            }
        }
        return "en"
    } catch(err){
        return "en"
    }
}
export const lang_obj = (lang:"ar" | "en") => {
    // main !== 1 all
    return {
        all:{
            lockedBasket:lang == "en" ? 'your basket is locked you need to **Confirm your invoice** first' : `تم إقفال سلتك حتى تقوم ***بالتحقق من فتورتك***`,
            err:lang == "en" ? `somthing is worng !` : `عذراً حدث خطأ ما`,
            ban_store_msg:lang =="en" ? `sorry this store has been banned` : `عذراً تم حظر هذا المتجر`,
            invalid_image_url:lang == "en" ? "invalid image url" : "رابط الصورة غير صالح",
            configrate:lang == "en" ? "configrate" : "إعداد",
            donate:lang == "en" ? "donate" : "تطوع",
            qunntyMustNumber:lang == "en" ? 'quantity must be a number' : 'الكمية يجب ان تكون رقماً',
            highQuintty:lang == "en" ? `the quantity is to high` : `الكمية جداً مرتفعه`,
            bad_permetion:lang == "en" ? 'sorry but **you can\'t use this** command' : `عذراَ انت غير مصرح لك لإستخدام هذا الامر`,
            no_data:lang == "en" ? 'sorry your server dose not have any configrations yet' : `عذرا سيرفرك لا يتضمن إعدادات خاصة`,
            create_config:lang == "en" ? 'configrate' : `إضافة إعدادات `,
            you_need_yo_add_paypal:lang == "en" ? "you need to add your paypal acount" : "يجب عليك إضافة حساب باي بال",
            you_need_to_add_configration:lang == "en" ? "you need to add your configarations" : "يجب عليك إكمال الإعدادت الخاصة بك",
            rate:{
                rate_me:lang == "en" ? "Rate me" : "قيمني",
            },
            singleProductEdit:{
                words:{
                    Product_Name:lang == "en" ? 'Product Name' : `اسم المنتج`,
                    Price:lang == "en" ? 'Price' : `سعر المنتج`,
                },
                buttons:{
                    createAnotherProduct:lang == "en" ? 'Create Another single product' : `انشاء منتج فردي آخر`,
                    updateThisProduct:lang == "en" ? 'Update this product' : `تحديث هذا المنتج`,
                    deleteThisProduct:lang == "en" ? 'Delete this product' : `حذف هذا المنتج`,
                    showAllProducts:lang == "en" ? 'Show all single product' : `اضهار جميع المنتجات الفردية`
                }
            }
        },
        // main !== 2 commands
        commands:{
            //commands !== 1 controller
            controller:{
                description:lang == "en" ? `in this command you can control all your products` : `في هذا الأمر ، يمكنك التحكم في جميع منتجاتك`,
                embid:{
                    title:lang == "en" ? 'Control Panel' : `لوحة التحكم`,
                    description:{
                        _1:lang == "en" ? 'Hello' : `مرحباَ`,
                        _2:lang == "en" ? `
    ***welcome to the Control Panel***
    this ***Controller*** allow you to control all your products
    in real time so you can add or update and delete
    any product you want and at the end
    you can use ***/publish_my_store*** to set up your products
    in your real server

    for adding a section press
    *** Add section Button ***

    for updating Section a section press
    *** Update section Button ***

    for Deleting Section a section press
    *** Delete section Button ***

    for See All Section a section press
    *** Show All Section Button ***` : 
    `***اهلاَ بك في لوحة التحكم***
    تسمح لك ***وحدة التحكم*** هذه بالتحكم في جميع منتجاتك
    في الوقت الفعلي حتى تتمكن من اضافة أو تعديل و حذف
    أي منتج تريده وفي النهاية
    يمكنك استخدام ***/publish_my_store*** لإعداد منتجاتك
    في سيرفرك

    لإضافة قسم اضغط على
    *** إضافة قسم ***

    للتعديل علة قسم إضغط على
    *** تعديل قسم ***

    لحذف قسم إضغط على
    *** حذف قسم ***

    لإظهار أسماء أقسامك اضغط على
    *** اضهار جميع الاقسام ***`
                    },
                    buttons:{
                        _1:lang == "en" ? 'Add section' : `إضافة قسم`,
                        _2:lang == "en" ? 'Update section' : `تعديل قسم`,
                        _3:lang == "en" ? 'Delete section' : `حذف قسم`,
                        _4:lang == "en" ? 'show all section' : `إضهار جميع الأقسام`,
                        _5:lang == "en" ? 'Create single product' : `إنشاء منتج فردي`,
                        _6:lang == "en" ? 'Update single product' : `تحديث منتج فردي`,
                        _7:lang == "en" ? 'Delete single product' : `حذف منتج فردي`,
                        _8:lang == "en" ? 'show one single product' :`إضهار منتج فردي`,
                        _9:lang == "en" ? 'show all single product' : `إضهار جميع المنتجات الفردية`
                    }
                }
            },
            //commands !== 2 publish_my_store
            publish_my_store:{
                finalMsg:lang == "en" ? 'all products has been sent' : `تم إرسال جميع المنتجات`,
                description:lang == "en" ? `with this command everyone will can see your products` : `هذا الامر يتيح لك إضهار منتجاتك للعامة`,
                errs:{
                    _1:lang == "en" ? 'there is no channel' : `عذرا لكن لا يوجد مكان ل نشر منتجاتك فيه`,
                    _2:lang == "en" ? `you don't have any product yet` : `ليس لديك منتجات ل تنشرها`
                },
                embeds:{
                    priceFld:lang == "en" ? 'Price' : `السعر`,
                    productNameFld:lang == "en" ? 'Product Name' : `إسم المنتج`,
                    buttons:{
                        _1:lang == "en" ? 'Add To Basket' : `إضافة الى السله`,
                        _2:lang == "en" ? 'Remove From Basket' : `حذف من السله`
                    }
                },
                selectors:{
                    priceDisc:lang == "en" ? 'Price' : `السعر`
                },
                basket:{
                    embid:{
                        title:lang == "en" ? 'basket' : 'السله',
                        description:lang == "en" ? `here you can check out and controle your products` : `هنا يمكنك الدفع و التحكم ب منتجاتك`,
                    },
                    buttons:{
                        _1:lang == "en" ? 'Show me my basket' : `إضهار سلتي`,
                        _2:lang == "en" ? 'Remove from my basket' : `حذف منتج من سلتي`,
                        _3:lang == "en" ? 'Check out' : `الدفع`,
                        _4:lang == "en" ? 'Confirm My Invoice' : `التحقق من فاتورتي`
                    }
                }
            },
            //commands !== 3 get_my_payments_by_date
            get_my_payments_by_date:{
                description:lang == "en" ? 'in this command you can take all your paid invoices bettwen two dates' : `في هذا الأمر ، يمكنك أخذ جميع فواتيرك المدفوعة بين تاريخين`,
                commandOptions:{
                    _1:{
                        name:lang == "en" ? 'start_date' : `start_date`,
                        description:lang == "en" ? 'Date must be like yyyy-mm-dd for example 2022-12-13' : `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`
                    },
                    _2:{
                        name:lang == "en" ? 'end_date' : `end_date`,
                        description:lang == "en" ? 'Date must be like yyyy-mm-dd for example 2022-12-13' : `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`
                    }
                },
                badMsgs:{
                    invaldDate:lang == "en" ? `***Invalid Date***
    you must write the date like this yyyy-mm-dd
    for example 2022-12-13` : `***طريقة كتابتك للتاريخ غير صحيحه***
    يجب أن تكتب التاريخ مثل هذا yyyy-mm-dd
    على سبيل المثال 2022-12-13`,
                    userHasNoInvoice:lang == "en" ? `has no invoices paid between dates` : `ليس لديه فواتير مدفوعة بين هذين التاريخين`,
                    connotFindTheUser:lang == "en" ? `cannot find the target user` : `عذراً لا يمكنني العثور على المستخدم الذي تقصده`,
                    userNoInvoiceYet:lang == "en" ? 'The user has no invoices paid' : `المستخدم ليس لديه فواتير مدفوعه`,
                },
                words:{
                    username:lang == "en" ? `Username` : `إسم المستخدم`,
                    userId:lang == "en" ? `User ID` : `آي دي المستخدم`,
                    productName:lang == "en" ? `product name` : `إسم المنتج`,
                    quantity:lang == "en" ? `quantity` : `الكمية`,
                    singleProductPrice:lang == "en" ? `single prodcut price` : `سعر المنتج الواحد`,
                    totlePrice:lang == "en" ? `Total Price` : `سعر المنتج مع الكميات`
                },
                okMsgs:{
                    dataCollectd:lang == "en" ? 'User information collected' : `تم جمع معلومات المستخدم`,
                    allInvoicesSent:lang == "en" ? 'All invoices have been sent' : `تم إرسال جميع الفواتير`
                },
                finalInvoices:{
                    notFoundInServer:lang == "en" ? `not found he must be on the server` : `غير موجود يجب ان يكون في السيرفر`,
                    invoicePideBy:lang == "en" ? `this invoice has been paid by` : `تم دفع هذه الفاتورة بواسطة`,
                    invoiceCreatedAt:lang == "en" ? `invoice created at` : `تم إنشاء الفاتورة في`,
                    invoiceUpdatedAT:lang == "en" ? `invoice updated or paid at` : `تم دفع او تعديل الفاتورة في`,
                    byUTC:lang == "en" ? `By UTC Time` : `حسب توقيت UTC`
                }
            },
            //commands !== 3 get_user_payments_by_date
            get_user_payments_by_date:{
                description:lang == "en" ? 'in this command you can take all paid invoices of user bettwen two dates' : `في هذا الأمر ، يمكنك أخذ جميع فواتير المستخدم المدفوعة بين تاريخين`,
                commandOptions:{
                    _1:{
                        name:lang == "en" ? 'user' : `user`,
                        description:lang == "en" ? 'Target user' : `المستخدم المقصود`
                    },
                    _2:{
                        name:lang == "en" ? 'start_date' : `start_date`,
                        description:lang == "en" ? 'Date must be like yyyy-mm-dd for example 2022-12-13' : `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`
                    },
                    _3:{
                        name:lang == "en" ? 'end_date' : `end_date`,
                        description:lang == "en" ? 'Date must be like yyyy-mm-dd for example 2022-12-13' : `يجب أن يكون التاريخ مثل yyyy-mm-dd على سبيل المثال 2022-12-13`
                    }
                },
            },
             //commands !== 4 create_embed
             create_embed:{
                model:{
                    title:lang == "en" ? "customise your embed" : "خصائص الإمبيد",
                    row_titles:{
                        _1:lang == "en" ? "embed title" : "عنوان الإبيد",
                        _2:lang == "en" ? "embed description" : "وصف الإبيد",
                        _3:lang == "en" ? "embed image url" : "رايط صورة للإمبيد (إختياري)", 
                    }
                },
             },
             //commands !== 5 publish_server_donation
             publish_server_donation:{
                embed:{
                    title:lang == "en" ? "Donation" : "دونيشن",
                    disc:lang == "en" ? `Through this link you can send
Send a Donation amount to the server` : `من خلال هذا الرابط يمكنك 
إرسال مبلغ تطوعي للسيرفر`,
                }
             },
             //commands !== 6 donate_me
             donate_me:{
                embed:{
                    title:lang == "en" ? "Donation" : "دونيشن",
                    disc:lang == "en" ? `Through this link you can send
Send a Donation amount to the server` : `من خلال هذا الرابط يمكنك 
إرسال مبلغ تطوعي للمستخدم`,
                }
             }
        },
        //main !== 3 custom_id
        custom_id:{
            // ping ping
            all:{
                sectionSelectror:{
                    words:{
                        price:lang == "en" ? 'Price' : `السعر`,
                        productName:lang == "en" ? 'product Name' : `اسم المنتج`,
                    },
                    noProductOption:{
                        label:lang == "en" ? 'no prodcuts yet' : `لا يوجد منتجات بعد`,
                        description:lang == "en" ? 'This is not a product' : `هذا ليس منتجا`
                    },
                    buttons:{
                        addProduct:lang == "en" ? 'Add product to this section' : `إضافة منتج للقسم`,
                        updateProduct:lang == "en" ? 'Update product in this section' : `تعديل منتج من القسم`,
                        deleteProduct:lang == "en" ? 'Delete product in this section' : `حذف منتج من القسم`
                    }
                }
            },
            //custom_id !== 1 add_product_section_to_basket
            add_product_section_to_basket:{
                addBasket:lang == "en" ? 'added to the basket with quantity' : `تم اضافة المنتج الى السلة بكمية`,
                only_25:lang == "en" ? 'you can take only ***25*** products names in your ***Basket***' : 'يمكنك إضافة ***25*** منتج في ***السله*** فقط'
            },
            //custom_id !== 2 add_to_basket__model
            add_to_basket__model:{
                addBasket:lang == "en" ? 'added to the basket with quantity' : `تم اضافة المنتج الى السلة بكمية`,
                only_25:lang == "en" ? 'you can take only ***25*** products names in your ***Basket***' :  'يمكنك إضافة ***25*** منتج في ***السله*** فقط'
            },
            //custom_id !== 3 add_to_basket
            add_to_basket:{
                lockedBasket:lang == "en" ? 'your basket is locked you need to **Confirm your invoice** first' : `تم إقفال سلتك حتى تقوم ***بالتحقق من فتورتك***`,
                model:{
                    addBasket:lang == "en" ? 'Add To Basket' : `إضافة الى السلة`,
                    quntty:lang == "en" ? 'Quantity' : `الكمية`,
                }
            },
            //custom_id !== 4 add_to_basket
            cancel_invoice:{
                notInvoiceYet:lang == "en" ? 'you dont have an invoice yet' : `ليس لديك فاتورة بعد`,
                butInvoceUnlocked:lang == "en" ? 'but your bascket is unlocked' : `لكن تم فتح فاتورتك`
            },
            //custom_id !== 5 check_out_create_model
            check_out__model:{
                tryAginEmail:lang == "en" ? 'try agine' : `حاول مجددأ`,
                invalidEmailMsg:lang == "en" ? 'invalid Email please try agine' : `عذراً البريد الإلكتروني غير صالح حاول مجدداَ`,
                udpatedEmail:lang == "en" ? 'Your email has been updated' : `تم تحديث البريد الإلكتروني ب نجاح`
            },
            //custom_id !== 6 check_out_create_model
            check_out_create_model:{
                title:lang == "en" ? `To complete the process, you must update your email` : `لإكمال العملية عليك تحديث بريدك الإلكتروني`,
                emailLable:lang == "en" ? 'Email' : `البريد الإلكتروني`
            },
            //custom_id !== 7 check_out
            check_out:{
                badMsg:lang == "en" ? `please send this message to the owner
    ***the channel of product logs not found***` : `الرجاء إرسال هذه الرسالة إلى المالك
    *** لم يتم العثور على روم سجلات المنتج ***`,
                model:{
                    title:lang == "en" ? 'Check Out' : `الذفع`,
                    emailLabe:lang == "en" ? 'Email' : `البريد الإلكتروني`,
                },
                embtyBasket:lang == "en" ? 'your basket is empty' : `سلتك فارغة`,
                okayMsg:{
                    title:lang == "en" ? 'Invoice Link' : `رابط الفاتورة`,
                    button:lang == "en" ? 'Link' : `الرابط`
                },
                adminMsg:{
                    embid:{
                        title:lang == "en" ? 'Invoice for' : `فاتورة ل`,
                        //here!!!
                        description:{
                            _1:lang == "en" ? 
    `this invoice **does not paid yet**
    the user **` : `هذه الفاتورة **لم يتم دفعها بعد**
    للسمتخدم **`,
                            _2:lang == "en" ? 
    `** checked out of his product
    But he hasn't paid anything yet.
    so to check if this invoice get paid
    please clicke **Is This Invoice Paid ?** Buuton` :
    `** الذي قام بتجميع منتجاته
    لكنه لم يدفع اي شيء بعد
    لذا للتأكد اذا ما تم دفع الفاتورة ام لا
    قم بالضغط على ***هل تم دفع الفاتورة ؟***`,
                        }
                    },
                    fealds:{
                        username:lang == "en" ? 'Username' : `إسم المستخدم`,
                        userId:lang == "en" ? 'User Id' : `آي دي المستخدم`
                    },
                    buttons:{
                        _1:lang == "en" ? 'Is This Invoice Paid ?' : `هل تم دفع الفاتورة ؟`,
                        _2:lang == "en" ? `Invoice Link` : `رابط الفاتورة`
                    }
                },
            },
            create_embed_model:{

            },
            //custom_id !== 8 create_Product__model
            create_Product__model:{
                badMsgs:{
                    _1:lang == "en" ? 'somthing is wrong connot find the section' : `حدث خطأ ما لا يمكنني إجاد القسم`,
                    productNameHighLen:lang == "en" ? `product name should be shorter` : `إسم النتج يجب ان يكون اقصر`,
                    priceMustNumper:lang == "en" ? `the product ***dose not added !!!***
    price must be a number !!!` : `***لم يتم*** إضافة منتج بعد
    السعر يجب ان يكون رقماً`,
                    priceToHigh:lang == "en" ? `the product ***dose not added !!!***
    the price is too high` : `***لم يتم*** إضافة منتج بعد
    السعر جداُ مرتفع`,
                    sectionNotFoundMsg:{
                        _1:lang == "en" ? `section ***` : `القسم ***`,
                        _2:lang == "en" ? `*** it does not exist or has been deleted` : `*** غير موجود او تم حذفه`,
                    },
                    only25:lang == "en" ? `you can add 25 product on every section` : `يمكنك إضافة 25 منتج فقط في كل قسم`,
                    productFound:{
                        _1:lang == "en" ? `the product ` : ` المنتج`,
                        _2:lang == "en" ? ` is already in this section` : ` موجود بالفعل في هذا القسم`
                    }
                },
                finalMsg:{
                    mag:lang == "en" ? 'new product added in section' : `تم إضافة منتج جديد في هذا القسم`,
                    priceWord:lang == "en" ? `Price` : `السعر`,
                    buttons:{
                        addProduct:lang == "en" ? 'Add product to this section' : `إضافة منتج للقسم`,
                        updateProduct:lang == "en" ? 'Update product in this section' : `تعديل منتج من القسم`,
                        deleteBroduct:lang == "en" ? 'Delete product in this section' : `حذف منتج من القسم`
                    }
                },
            },
            //custom_id !== 9 create_product
            create_product:{
                model:{
                    title:lang == "en" ? 'Create Products Section' : `إنشاء منتج جديد داخل القسم`,
                    productNameLable:lang == "en" ? "Product Name" : `إسم المنتج`,
                    productPrice:lang == "en" ? "Product Price" : `سعر المنتج`
                }
            },
            //custom_id !== 10 create_Section__model
            create_Section__model:{
                badMsg:{
                    alredyHavProduct:lang == "en" ? 'you already have a section with name' : `لدبك بالفعل قسم بالإسم`,
                    highNameSection:lang == "en" ? `the name is to long of this Section` : `الإسم غير مناسب لهذا القسم`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `section` : 'تم إضافة قسم جديد بإسم',
                        _2:lang == "en" ? `added do you want to add a product on it` : `هل تريد إضافة منتجات عليه`
                    },
                    selector:{
                        placeHolder:lang == "en" ? 'there is no product' : `لا يوجد منتج`,
                        option:{
                            lable:lang == "en" ? 'no prodcuts yet' : `لا يوجد منتج بعد`,
                            description:lang == "en" ? 'This is not a product' : `هذا ليس منتجاَ`
                        }
                    },
                    buttons:{
                        addProduct:lang == "en" ? 'Add product to this section' : `إنشاء منتج جديد داخل القسم`,
                    }
                }
            },
            //custom_id !== 11 create_section
            create_section:{
                model:{
                    title:lang == "en" ? `Create Products Section` : `إنشاء قسم جديد`,
                    sectionNameLable:lang == "en" ? 'Section Name' : `إسم القسم`
                }
            },
            //custom_id !== 12 create_single_product__model
            create_single_product__model:{
                bsdMsg:{
                    badImagURL:lang == "en" ? 'img url is invalid' : `رابط الصورة غير صالح`,
                    priceMustBeNumber:lang == "en" ? `the product ***dose not added !!!***
    price must be a number !!!` : `***لم يتم*** إضافة منتج بعد
    السعر يجب ان يكون رقماً`,
                    priceToHigh:lang == "en" ? `the product ***dose not added !!!***
    the price is too high` : `***لم يتم*** إضافة منتج بعد
    السعر جداُ مرتفع`,
                    productNameIsToLong:lang == "en" ? `product name is too long` : `اسم المنتج طويل جداَ`,
                    productFound:lang == "en" ? 'You already have a prodcut with name' : `لديك بالفعل منتج فردي بإسم`,
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? 'prodcut' : `تم إنشاء منتج جديد بإسم`,
                        _2:lang == "en" ? 'has been created' : `بنجاح`,
                    },
                    price:lang == "en" ? 'Price' : `السعر`,
                    productName:lang == "en" ? 'Product Name' : `إسم المنتج`,
                    buttons:{
                        createAnotherProduct:lang == "en" ? 'Create Another single product' : `إنشاء منتج فردي آخر`,
                        updateThisProduct:lang == "en" ? 'Update this product' : `تعديل هذا المنتج الفردي`,
                        deleteThisProduct:lang == "en" ? 'Delete this product' : `حذف هذا المنتج الفردي`,
                        showAllProducts:lang == "en" ? 'Show all single product' : `إضهار جميع المنتجات الفردية`
                    }
                }
            },
            //custom_id !== 13 create_single_product
            create_single_product:{
                model:{
                    title:lang == "en" ? 'Create Single Product' : `إنشاء منتج فردي جديد`,
                    lables:{
                        productName:lang == "en" ? "Product Name" : `اسم المنتج`,
                        productPrice:lang == "en" ? "Product Price" : `سعر المنتج`,
                        productDisc:lang == "en" ? 'Product Description (optional)' : `وصف المنتج (إختياري)`,
                        productImgURL:lang == "en" ? "Product Image URL (optional)" :`رابط صورة للمنتج (إختياري)`,
                    }
                }
            },
            //custom_id !== 14 delete_msg_with_id
            delete_msg_with_id:{
                badMsg:{
                    noMsgs:lang == "en" ? 'this channel have no massges' : ` عذرا لكن لا يمكنني إجاد رسائل في هذه القناه لحذفها`,
                },
                finalMsg:{
                    ok:lang == "en" ? 'Log deleted' : `تم حذف السجل`,
                    ok2:lang == "en" ? 'Log deleted' : `تم حذف السجل`,
                    notOK:lang == "en" ? 'message not found' : `عذرا لكن لا يمكنني إجاد السجل المقصود`
                }
            },
            //custom_id !== 15 delete_msg
            delete_msg:{
                loding:lang == "en" ? '...Laoding' : `جار التحميل...`
            },
            //custom_id !== 16 delete_product__model
            delete_product__model:{
                badMsg:{
                    sectionNotFound:lang == "en" ? 'somthing is wrong connot find the section' : `هناك خطأ ما لا يمكنني إجاد القسم`,
                    productNotFoundsMsg:{
                        _1:lang == "en" ? `you don't have a product with name` : `عذراً ليس لديك منتج بإسم`,
                        _2:lang == "en" ? 'in section' : `في القسم`,
                    },
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? 'are you sure that you want to delete prodcut' : `هل أنت متأكد من حذف منتج`,
                        _2:lang == "en" ? `in section` : `في القسم`
                    },
                    buttons:{
                        yesDelete:lang == "en" ? 'Yes' : `نعم`
                    }
                }
            },
            //custom_id !== 17 delete_product_yes
            delete_product_yes:{
                badMsgs:{
                    productNotFound:{
                        _1:lang == "en" ? `there is no prodcut with name` : `لا يوجد منتج بالإسم`,
                        _2:lang == "en" ? 'in section' : `في القسم`
                    }
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? 'product' : `تم حذف المنتج`,
                        _2:lang == "en" ? 'has been deleted in section' : `بنجاح داخل القسم`
                    }
                }
            },
            //custom_id !== 18 delete_product
            delete_product:{
                model:{
                    title:lang == "en" ? 'delete Product' : `حذف منتج`,
                    productNameLable:lang == "en" ? "Product Name" : `إسم المنتج`
                }
            },
            //custom_id !== 19 delete_Section__model
            delete_Section__model:{
                badMsgs:{
                    sectionNotFound:lang == "en" ? 'there is no section with name' : `لا يوجد قسم بإسم`
                },
                finalMag:{
                    msg:{
                        _1:lang == "en" ? 'are you sure that you want to delete section' : 'هل انت متأكد من حذف القسم',
                        _2:lang == "en" ? 'with all it products' : 'ب جميع منتجاته',
                    },
                    buttons:{
                        yesDelete:lang == "en" ? 'Yes' : `نعم`
                    }
                }
            },
            //custom_id !== 20 delete_Section__model
            delete_section_yes:{
                badMsgs:{
                    sectionNotFound:lang == "en" ? 'there is no section with name' : 'لا يوجد قسم بإسم'
                },
                finalMag:{
                    msg:{
                        _1:lang == "en" ? 'section' : `تم حذف القسم`,
                        _2:lang == "en" ? 'deleted.' : `بنجاح`
                    }
                }
            },
            //custom_id !== 21 delete_Section__model
            delete_section:{
                model:{
                    title:lang == "en" ? 'Delete Products Section' : `حذف منتج داخل القسم`,
                    productNameLable:lang == "en" ? `Section Name` : `إسم المنتج`
                }
            },
            //custom_id !== 22 delete_single_product__model
            delete_single_product__model:{
                badMsgd:{
                    productNotFound:lang == "en" ? `you don't have a product with name` : `ليس لديك منتج بإسم`,
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? 'are you sure that you want to delete prodcut' : `هل انت متأكد من حذف المنتج`
                    },
                    buttons:{
                        yesDelete:lang == "en" ? 'Yes' : 'نعم'
                    }
                }
            },
            //custom_id !== 23 delete_single_product_yes
            delete_single_product_yes:{
                badMsgs:{
                    productNotFound:lang == "en" ? 'there is no product with name' : `لا سوجد منتج بإسم`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? 'product' : `تم حذف المنتج`,
                        _2:lang == "en" ? 'deleted.' : `بنجاح`,
                    }
                }
            },
            //custom_id !== 24 delete_single_product
            delete_single_product:{
                model:{
                    title:lang == "en" ? 'Delete Single Products' : `حذف منتج فردي`,
                    productNameLable:lang == "en" ? "Single Product Name" : `إسم المنتج`
                }
            },
            //custom_id !== 25 delete_this_single_product
            delete_this_single_product:{
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `are you sure that you want to delete prodcut` : `هل أنت متأكد من حذف المنتج`
                    },
                    buttons:{
                        yesDeleteButton:lang == "en" ? `Yes` : `نعم`
                    },
                }
            },
            //custom_id !== 26 is_invoice_payed
            is_invoice_payed:{
                invoiceHasCanceled:{
                    embid:{
                        title:lang == "en" ? 'Cancelled Invoice' : `إلغاء الفاتورة`,
                        description:lang == "en" ? `This invoice ***has been cancelled*** Do you want to delete the above log?` : `***لقد تمت إلغاء الفاتورة*** هل تريد حذف السجل الخاص بها`,
                        fealds:{
                            username:lang == "en" ? 'Username' : `إسم المستخدم`,
                            userId:lang == "en" ? `User Id` : `آي دي المستخدم`,
                            msgId:lang == "en" ? `Message Id` : `آي دي رسالة السجل`
                        }
                    },
                    buttons:{
                        yesDelete:lang == "en" ? `Yes` : `نعم`,
                    },
                    finalMsg:{
                        msg:{
                            _1:lang == "en" ? 'this invoice has been canceled' : `تم إلغاء هذه الفاتورة`
                        }
                    }
                },
                notPaidInvoice:{
                    embid:{
                        title:lang == "en" ? 'this invoice does not paid yet' : `لم يتم دفع الفاتورة بعد`
                    },
                    buttons:{
                        pay:lang == "en" ? 'Invoice Link' : `رابط الفاتورة`
                    }
                },
                badMsgs:{
                    noInvoiceYet:lang == "en" ? 'you dont have an invoice yet' : `ليس لديك أي فواتير بعد`,
                    iCantFindInvoice:lang == "en" ? 'i cant find your invoice' : `عذراَ لا يمكنني إيجاد فاتورتك`
                },
                paidInvoice:{
                    embid:{
                        title:lang == "en" ? 'This invoice has been paid ($$$)' : `تم دفع هذه الفاتورة ($$$)`,
                        description:{
                            congrat:{
                                _1:lang == "en" ? `congrats 🎆🎈
    the customer` : `هنيئاَ العميل`
                                ,
                                _2:lang == "en" ? `***has paid his invoice***` : `***قام ب دفع فاتورته***`
                            },
                            words:{
                                User:lang == "en" ? `User` : `المستخدم`,
                                Total_Price:lang == "en" ? `Total Price` : `السعر الكامل`,
                                invoice_created_at:lang == "en" ? `invoice created at` : `تم إنشاء الفاتورة في`,
                                invoice_paid_at:lang == "en" ? `invoice paid at` : `تم دفع الفاتورة في`,
                                By_UTC_Time:lang == "en" ? `By UTC Time` : `حسب توقيت UTC`,
                                products:lang == "en" ? `products` : `المنتجات`,
                                product_name:lang == "en" ? `product name` : `إسم المنتج`,
                                quantity:lang == "en" ? `quantity` : `الكمية`,
                                single_prodcut_price:lang == "en" ? `single prodcut price` : `سعر المنتج الواحد`,
                                total_product_price:lang == "en" ? `total product price` : `سعر المنتج مع الكميات`
                            }
                        }
                    },
                },
                finalUserMsg:{
                    embid:{
                        title:lang == "en" ? 'Your paypemt has been completed' : `تم إكمال عملية ادفع ب نجاح`,
                        description:lang == "en" ? 'Thank you' : `شكراً لك`
                    },
                    buttons:{
                        invoiceLink:lang == "en" ? `Invoice Link` : `رابط الفاتورة`
                    }
                }
            },
            //custom_id !== 27 remove_basket_product_yes
            remove_basket_product_yes:{
                badMsgs:{
                    emptyBasket:lang == "en" ? 'your basket is empty' : `سلتك فارة`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `product` : `تم إزالة المنتج`,
                        _2:lang == "en" ? `removed.` : `بنجاح`
                    }
                }
            },
            //custom_id !== 28 remove_basket_product
            remove_basket_product:{
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `are you sure that you want to remove` : `هل انت متأكد من إزالة المنتج`
                    },
                    buttons:{
                        yesRemove:lang == "en" ? 'Yes' : `نعم`
                    }
                }
            },
            //custom_id !== 29 remove_from_basket__model
            remove_from_basket__model:{
                badMsgs:{
                    qunttyMustNumber:lang == "en" ? 'quantity must be a number' : `الكمية يجب ان تكون رقماً`,
                    emptyBasket:lang == "en" ? `your basket is empty` : `سلتك فارغة`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `removed from your basket with quantity` : `تمت إزالة المنتج بنجاح بالكمية`
                    }
                }
            },
            //custom_id !== 30 remove_from_basket
            remove_from_basket:{
                model:{
                    title:lang == "en" ? 'Remove Products From Basket' : `إزالة منتج من السله`,
                    quantityLable:lang == "en" ? `Quantity` : `الكمية`
                }
            },
            //custom_id !== 31 remove_from_my_basket
            remove_from_my_basket:{
                badMsgs:{
                    emptyBasket:lang == "en" ? 'your basket is empty' : `سلتك فارغة`,
                },
                selector:{
                    words:{
                        basket:lang == "en" ? `basket` : `سلة`,
                        price:lang == "en" ? `price` : `السعر`
                    }
                }
            },
            //custom_id !== 32 remove_from_my_basket
            show_all_section:{
                badMsgs:{
                    noSections:lang == "en" ? 'you dont have any section yet' : `ليس لديك أي قسم بعد`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `all the name of the sections you have` : `جميع أسماء الأقسام التي لديك`
                    }
                }
            },
            //custom_id !== 33 remove_from_my_basket
            show_all_single_product:{
                badMsgs:{
                    noProducts:lang == "en" ? 'you dont have any ***Single products*** yet' : `ليس لديك أي ***منتج فردي*** بعد`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `all single products found` : `تم إجاد جميع أسماء منتجاتك الفردية`
                    }
                }
            },
            //custom_id !== 34 show_me_my_basket
            show_me_my_basket:{
                badMsgs:{
                    emptyBasket:lang == "en" ? 'your basket is empty' : `سلتك فارغة`
                },
                selector:{
                    basket:lang == "en" ? `basket` : `سلة`,
                    price:lang == "en" ? `price` : `السعر`
                }
            },
            //custom_id !== 35 show_one_single_product__model
            show_one_single_product__model:{
                badMsgs:{
                    productNotFound:lang == "en" ? `You don't have a prodcut with name` : `ليس لديك منتج فردي ب إسم`
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `prodcut` : `تم إيجاد المنتج`,
                        _2:lang == "en" ? `found` : `بنجاح`
                    }
                }
            },
            //custom_id !== 36 show_one_single_product
            show_one_single_product:{
                model:{
                    title:lang == "en" ? 'Show One Single Product' : `إضهار منتج فردي`,
                    productNameLable:lang == "en" ? "Product Name" : `إسم المنتج`
                }
            },
            //custom_id !== 37 show_product_basket
            show_product_basket:{
                embid:{
                    title:lang == "en" ? 'product basket' : `منتجات السلة`,
                    words:{
                        Price:lang == "en" ? 'Price' : `السعر`,
                        Product_Name:lang == "en" ? `Product Name` : `إسم المنتج`
                    },
                }
            },
            //custom_id !== 38 submit_my_invoice
            submit_my_invoice:{
                badMsgs:{
                    noInvoice:lang == "en" ? `you dont have any invoice to pay yet` : `ليس لديك أي منتج لتدفعه بعد`
                },
                finalMsg:{
                    embid:{
                        title:{
                            _1:lang == "en" ? `Invoice for` : `فالورة للمستخدم`
                        },
                        // here
                        description:lang == "en" ? `this invoice **does not paid yet**

    **why is my basket is locked?**
    your basket locked because you haven't paid your invoice yet
    if you paid your invoice, press **I Pide The Invoice** Button
    and your basket will unlock dynamically

    **what do I do to unlock my basket with out paying?**
    press **Cancel invoice** Button
    to cancel the invoice you created
    and invoice will get canceled then
    your basket will get unlocked` : 
    `**لم يتم** دفع الفاتورة بعد

    **لماذا لا يمكنني التحكم ب سلتي**
    تم إقفال سلتك لعدم إكمال إجرائات الدفع بعد
    في حال تم دفع الفاتروة قم بالغط على **لقد دفعت فاتورتي**
    و ستم فك قفل سلتك بعد ذالك

    كيف يمكنني فتح قفل سلتي دون الدفع
    إضغط على **إلغاء الفاتورة**
    لإلغاء فاتورتك
    و سيتم الغاء فاتورتم و يعد ذالك
    سيتم فتح قفل سلتك`
                        ,
                        filds:{
                            username:lang == "en" ? `Username` : `إسم المستخدم`,
                            userId:lang == "en" ? 'User Id' : `آي دي المستخدم`
                        }
                    },
                    buttons:{
                        invouceLink:lang == "en" ? `Invoice Link` : `رابط الفاتورة`,
                        iPaidInvoice:lang == "en" ? `I Pide The Invoice` : `لقد دفعت فاتورتي`,
                        cancelInvoice:lang == "en" ? `Cancel invoice` : `إلغاء الفاتورة`
                    }
                }
            },
            //custom_id !== 39 update_product__model
            update_product__model:{
                badMsgs:{
                    productNameTooLong:lang == "en" ? `new product name is to long` : `اسم المنتج الجديد طويل جداً`,
                    noSection:lang == "en" ? `somthing is wrong connot find the section` : `هناك خطأ ما لا يمكنني إيجاد القسم المطلوب`,
                    priceMustNuber:lang == "en" ? `the product ***dose not added !!!***
    price must be a number !!!` : `***لم يتم*** إضافة منتج بعد
    السعر يجب ان يكون رقماً`,
                    priceToHigh:lang == "en" ? `the product ***dose not added !!!***
    the price is too high` : `***لم يتم*** إضافة منتج بعد
    السعر جداُ مرتفع`,
                    productNotFound:{
                        _1:lang == "en" ? `there is no product with name` : `ليس لديك منتج بالإسم`,
                        _2:lang == "en" ? `in section` : `في القسم`,
                    },
                    thereAnotherProduct:{
                        _1:lang == "en" ? `the product` : `لديك بالفعل منتج`,
                        _2:lang == "en" ? `is already in section` : `داخل القسم`,
                    }
                },
                finalMsg:{
                    _1:lang == "en" ? `product` : `تم تحديث المنتج`,
                    _2:lang == "en" ? `updated in section` : `في القسم`,
                    _3:lang == "en" ? `Old Product Name` : `الإسم القديم`,
                    _4:lang == "en" ? `New Product Name` : `الإسم الجديد`,
                    _5:lang == "en" ? `price` : `السعر`
                }
            },
            //custom_id !== 40 update_product
            update_product:{
                model:{
                    title:lang == "en" ? 'Update Products Section' : `تحديث منتج داخل قسم`,
                    lables:{
                        oldName:lang == "en" ? "old Product Name" : `الإسم القديم للمنتج`,
                        newName:lang == "en" ? "new Product Price" : `الإسم الجديد للمنتج`,
                        productPrice:lang == "en" ? "Product Price" : `سعر المنتج`
                    }
                }
            },
            //custom_id !== 41 update_Section__model
            update_Section__model:{
                basMsgs:{
                    sectionNotFound:lang == "en" ? `there is no section called` : `لا يوجد قسم يدعى`
                },
                finalMsg:{
                    _1:lang == "en" ? `section` : `تم إيجاد القسم`,
                    _2:lang == "en" ? `has found you can edit it` : `و يمكنك التعديل عليه`
                }
            },
            //custom_id !== 42 update_Section__model
            update_section:{
                model:{
                    title:lang == "en" ? 'Update Products Section' : `تحديث قسم`,
                    sectionNameLable:lang == "en" ? "Section Name" : `إسم القسم`
                }
            },
            //custom_id !== 43 update_single_product__model
            update_single_product__model:{
                badMsgs:{
                    productToLoong:lang == "en" ? `product name is too long` : `إسم المنتج طويل جداَ`,
                    priceMustBeANumber:lang == "en" ? `the product ***dose not added !!!***
    price must be a number !!!` : `***لم يتم*** إضافة منتج بعد
    السعر يجب ان يكون رقماً`
                    ,
                    priceToHigh:lang == "en" ? `the product ***dose not added !!!***
    the price is too high` : `***لم يتم*** إضافة منتج بعد
    السعر جداُ مرتفع`
                    ,
                    productNotFound:lang == "en" ? `You don't have a prodcut with name` : `ليس لديك منتج  فردي بالإسم`,
                    thereIsAnotherProduct:lang == "en" ? `You already have a prodcut with name` : `لديك باللإعل منج بالإسم`
                },
                finaMsg:{
                    msg:{
                        _1:lang == "en" ? `prodcut` : `تم تحديث المنتج `,
                        _2:lang == "en" ? `has been Updated` : `بنجاح`,
                        _3:lang == "en" ? `Old Name` : `إسم المنتج القديم`,
                        _4:lang == "en" ? `New Name` : `إسم المنتج الجديد`,
                        _5:lang == "en" ? `price` : `السعر`,
                    }
                },
            },
            //custom_id !== 44 update_single_product
            update_single_product:{
                model:{
                    title:lang == "en" ? `Update Single Product` : `تحديث منتج فردي`, 
                    lables:{
                        oldName:lang == "en" ? "Product Old Name" : `إسم المنتج القديم`,
                        newName:lang == "en" ? "Product New Name" : `إسم المنتج الجديد`,
                        price:lang == "en" ? "Product Price" : `سعر المنتج`,
                        disc:lang == "en" ? "Product Description (optional)" : `وصف المنتج (إختياري)`,
                        imageURL:lang == "en" ? "Product Image URL (optional)" : `رابط صورة للمنتج (إختياري)`,
                    }
                }
            },
            //custom_id !== 45 update_this_single_product__model
            update_this_single_product__model:{
                badMsgs:{
                    productNameToLoog:lang == "en" ? `product name is too long` : `إسم المنتج طويل جداَ`,
                    productNotFoundError:lang == "en" ? 'somthing is wrong connot find the product' : ``,
                    priceMusetBeANumber:lang == "en" ? `the product ***dose not added !!!***
    price must be a number !!!` : `***لم يتم*** إضافة منتج بعد
    السعر يجب ان يكون رقماً`
                    ,
                    priceToHigh:lang == "en" ? `the product ***dose not added !!!***
    the price is too high` : `***لم يتم*** إضافة منتج بعد
    السعر جداُ مرتفع`
                    ,
                    productNotFound:lang == "en" ? `You don't have a prodcut with name` : `ليس لديك منتج فردي بالإسم`,
                    anotherProduct:lang == "en" ? `You already have a prodcut with name` : `لديك بالفعل منتج فردي بالإسم `
                },
                finalMsg:{
                    msg:{
                        _1:lang == "en" ? `prodcut` : `تم تحديث المنتج`,
                        _2:lang == "en" ? `has been Updated` : `بنجاح`,
                        _3:lang == "en" ? `Old Name` : `إسم المنتج القديم`,
                        _4:lang == "en" ? `New Name` : `إسم المنتج الجديد`,
                        _5:lang == "en" ? `price` : `السعر`,
                    }
                }
            },
            //custom_id !== 46 update_this_single_product__model
            update_this_single_product:{
                model:{
                    title:lang == "en" ? 'Update Single Product' : `تحديث منتج فردي`,
                    lables:{
                        newName:lang == "en" ? "New Product Name" : `إسم المنتج الجديد`,
                        price:lang == "en" ? `Product Price` : `سعر المنتج`,
                        disc:lang == "en" ? "Product Description (optional)" : `وصف المنتج (إختياري)`,
                        imageURL:lang == "en" ? "Product Image URL (optional)" : `رابط صورة للمنتج (إختياري)`
                    }
                }
            }
        },
        // main !== 4 paypal
        payPal:{
            canceled_invoice_unlocked_basket:lang == "en" ? 'Invoice Canceled And Your Basket Is Unlocked' : `تم إلغاء فاتورتك و تم فتح قفل سلتك`,
            invoice_notfound_unlocked_basket:lang == "en" ? 'Invoice is not found or has been canceled' : `لم يتم العثور على الفاتورة او قد تم إلغائها`
        }
    }
}
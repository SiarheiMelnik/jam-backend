const LABELS = {
    EMAIL : "Ваш e-mail",
    FIO : "Фамилия, имя, отчество гражданина",
    ADDRESS : "Адрес места жительства либо места пребывания гражданина",
    SEND_APPLY : "Отправить обращение",
    NEW_APPLY : "Новое обращение",
    FIELD_REQUIRE : "Пожалуйста, заполните поле корректно",
};

const SELECT_BLOCK = {
    LETTER_THEME : "Тема сообщения",
    TREE_NAME : "Порода дерева",
    DAMAGE : "Вид повреждения",
}; 

const TREES = [
    {
        idOfTree : 112,
        name : 'дуб'
    },
    {
        idOfTree : 122,
        name : 'ясень'
    },
    {
        idOfTree : 132,
        name : 'липа'
    },
    {
        idOfTree : 142,
        name : 'каштан'
    },
    {
        idOfTree : 152,
        name : 'вяз'
    },
    {
        idOfTree : 199,
        name : 'другое'
    },
];

const APPEALS = [
    {
        idOfTree : 212,
        name : 'Хочу сообщить об опасном дереве'
    },
    {
        idOfTree : 222,
        name : 'Хочу узнать о причине спила дерева'
    },
    {
        idOfTree : 232,
        name : 'Хочу закинуть + в карму'
    },
    {
        idOfTree : 299,
        name : 'иное'
    },
];

const DEMAGES = [
    {
        idOfTree : 312,
        name : 'Надломленная ветка'
    },
    {
        idOfTree : 322,
        name : 'Упавшее дерево'
    },
    {
        idOfTree : 332,
        name : 'Сухостой'
    },
    {
        idOfTree : 399,
        name : 'иное'
    },
];



export { 
    LABELS, 
    SELECT_BLOCK, 
    APPEALS,
    TREES, 
    DEMAGES,
};
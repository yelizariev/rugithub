// tools
const xpath = (query) => {
    // https://stackoverflow.com/questions/37098405/javascript-queryselector-find-div-by-innertext
    const node = document.evaluate(query, document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    if (node && !node.attributes['data-rugithub-handled']){
        return node;
    }
};

// translations
const repo_navbar = {
    "Code": "Исходники",
    "Issues": "Дела",
    "Pull requests": "Пул-Реквесты",
    "Actions": "Автоматизация",
    "Projects": "Проекты",
    "Wiki": "Вики",
    "Security": "Безопасность",
    "Insights": "Статистика",
    "Settings": "Настройки",
};
const merge_buttons = {
    "btn-group-merge": "Влить ПР",
    "btn-group-squash": "Сплющить и влить",
    "btn-group-rebase": "Заребейзить и влить",
};

const action_buttons = {
    "Close issue": "Закрыть дело",
};
const links = {
    "New issue": "Завести дело",
};


const treat_all = () => {
    for (const key in repo_navbar) {
        const node = document.querySelector('span[data-content="'+ key +'"]:not([data-rugithub-handled])');
        if (node) {
            node.setAttribute('data-rugithub-handled', 1);
            node.innerText = repo_navbar[key];
        }
    }
    for (const key in merge_buttons) {
        const node = document.querySelector('button.'+ key +':not([data-rugithub-handled])');
        if (node) {
            node.setAttribute('data-rugithub-handled', 1);
            node.innerText = merge_buttons[key];
        }
    }
    for (const key in action_buttons) {
        const node = document.querySelector('span[data-default-action-text="'+ key +'"]:not([data-rugithub-handled])');
        if (node) {
            node.setAttribute('data-rugithub-handled', 1);
            node.innerText = action_buttons[key];
        }
    }
    for (const key in links) {
        let node;
        do{
            node = xpath('//a[contains(., "'+ key +'")]');
            if (node) {
                node.setAttribute('data-rugithub-handled', 1);
                node.innerText = links[key];
            }
        } while(node)
    }
};
treat_all();
window.addEventListener('pjax:end', treat_all);

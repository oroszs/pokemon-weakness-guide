import weaknessData from '@data/data.js';
import {toTitleCase} from '@components/utils.js';

export const createTypeElement = (typeKey, element) => {
    let typeElement = document.createElement(`${element}`);
    typeElement.classList.add(`type-${element}`, 'type-element', 'column-center-flex');
    typeElement.dataset.type = typeKey;
    const image = document.createElement('img');
    image.classList.add('type-image');
    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrapper', 'column-center-flex', `${typeKey}`);
    let src = `../../assets/icons/${typeKey}.svg`;
    if(src) {
        image.src = src;
    }
    const typeLabel = document.createElement('h4');
    typeLabel.classList.add('type-label');
    typeLabel.textContent = toTitleCase(typeKey);
    imageWrap.append(image);
    typeElement.append(imageWrap, typeLabel);
    return typeElement;
}

export const selectType = (but) => {
    const type = but.dataset.type;
    let oldSelected = document.querySelectorAll('.selected');
    oldSelected.forEach(el => {el.classList.remove('selected')});
    but.classList.add('selected');
    const typeWrap = document.querySelector('#current-type-wrapper');
    let infoWraps = typeWrap.querySelectorAll('.info-wrap');
    infoWraps.forEach(div => {
        div.remove();
    });
    for(let i = 0; i < 3; i++) {
        let infoWrap = document.createElement('div');
        infoWrap.classList.add('info-wrap', 'column-center-flex');
        let infoHead = document.createElement('h2');
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        if(i == 2) {
            infoHead.textContent = 'Immune';
            if(weaknessData[type].immune) {
                infoWrap.classList.remove('hide-element');
                weaknessData[type].immune.forEach(type => {
                    infoDiv.append(createTypeElement(type, 'div'));
                });
            } else {
                infoWrap.classList.add('hide-element');
            }
        } else if (i == 1) {
            infoHead.textContent = 'Resistant';
            if(weaknessData[type].resistant) {
                infoWrap.classList.remove('hide-element');
                weaknessData[type].resistant.forEach(type => {
                    infoDiv.append(createTypeElement(type, 'div'));
                });
            } else {
                infoWrap.classList.add('hide-element');
            }    
        } else if (i == 0) {
            infoHead.textContent = 'Weak';
            weaknessData[type].weak.forEach(type => {
                infoDiv.append(createTypeElement(type, 'div'));
            });
        }
        let typeElements = infoDiv.querySelectorAll('.type-element');
        if(typeElements.length > 6) infoDiv.classList.add('wide-div');
        infoWrap.append(infoHead, infoDiv);
        typeWrap.append(infoWrap);
    }
    const currentType = document.querySelector('#current-type');
    let currentTypeDivs = currentType.querySelectorAll('.type-div');
    currentTypeDivs.forEach(el => {
        el.remove();
    });
    currentType.append(createTypeElement(type, 'div'));
}
function hoverAva() {
    let modalProfile = document.querySelector('.js-option-profile');
    let subnav = document.querySelector('.js-subnav');
    console.log(modalProfile, subnav)
    const openProfileOptions = function () {
        subnav.classList.add('open');
    }
    const closeProfileOptions = function () {
        subnav.classList.remove('open');
    }

    modalProfile.addEventListener('mouseover', openProfileOptions);
    modalProfile.addEventListener('mouseout', closeProfileOptions);
}
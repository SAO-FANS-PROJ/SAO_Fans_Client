const isPhone = () => {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}
export default isPhone;
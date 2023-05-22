import { engine } from "express-handlebars";
import hbs_sections from "express-handlebars-sections";

export default function (app) {
    app.engine(
        "hbs",
        engine({
            defaultLayout: "main",
            extname: "hbs",
            helpers: {
                // Function to do basic mathematical operation in handlebar
                section: hbs_sections(),
                math: function (lvalue, operator, rvalue) {
                    lvalue = parseFloat(lvalue);
                    rvalue = parseFloat(rvalue);
                    return {
                        "+": lvalue + rvalue,
                        "-": lvalue - rvalue,
                        "*": lvalue * rvalue,
                        "/": lvalue / rvalue,
                        "%": lvalue % rvalue,
                    }[operator];
                },
                isEmpty: function (value) {
                    return !value;
                },
                extractName: function (fullName) {
                    if (fullName) {
                        var nameParts = fullName.split(' ');
                        return nameParts[nameParts.length - 1];
                    }
                    return '';
                },
                isFree: function (value) {
                    return value === 0;
                },
                checkTeacher: function (value) {
                    return value === "Teacher";
                },
                ifEqualString: function (a, b, opts) {
                    if (a === b) {
                        return opts.fn(this);
                    } else {
                        return opts.inverse(this);
                    }
                },
                ifCond: function (v1, operator, v2, options) {
                    switch (operator) {
                        case '<':
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        case '>':
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        case '<=':
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        case '>=':
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        case '==':
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        case '!=':
                            return (v1 != v2) ? options.fn(this) : options.inverse(this);
                        default:
                            return options.inverse(this);
                    }
                },
                formatDate: function (timestamp) {
                    var date = new Date(timestamp);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                },
                ifOr: function (a, b, opts) {
                    return (a || b) ? opts.fn(this) : opts.inverse(this);;
                },
                ifNotEqualString: function (a, b, opts) {
                    if (a !== b) {
                        return opts.fn(this);
                    } else {
                        return opts.inverse(this);
                    }
                },
                isEven: function (index) {
                    return index % 2 === 0;
                },
                getIconClass: function (ten) {
                    // Ánh xạ từ tên tiện ích sang tên lớp CSS hoặc lớp biểu tượng tương ứng
                    if (ten === 'Bãi xe') {
                        return 'fa-solid fa-car';
                    } else if (ten === 'Thú cưng') {
                        return 'fa-solid fa-dog';
                    } else if (ten === 'Wifi') {
                        return 'fa-solid fa-wifi';
                    } else if (ten === 'Tivi') {
                        return 'fa-solid fa-tv-retro';
                    } else if (ten === 'Tủ lạnh') {
                        return 'fa-solid fa-refrigerator';
                    } else if (ten === 'Chủ riêng') {
                        return 'fa-solid fa-person fa-lg';
                    } else if (ten === 'Giờ giấc tự do') {
                        return 'fa-solid fa-timer';
                    } else if (ten === 'Ban công') {
                        return 'fa-solid fa-house-user';
                    } else if (ten === 'Bếp') {
                        return 'fas fa-utensils';
                    }
                    // Thêm các trường hợp khác tương ứng với biểu tượng
                    //...
                    else {
                        return 'fas fa-default-icon'; // Biểu tượng mặc định nếu không tìm thấy ánh xạ
                    }
                },
                getIconSizeClass: function (ten) {
                    if (ten === 'Tủ lạnh') {
                        return 'icon-lg'; // Chỉnh kích thước tùy ý bằng lớp CSS 'icon-lg'
                    } else {
                        return 'icon-sm'; // Lớp CSS mặc định cho các biểu tượng khác
                    }
                },
                star: function (numberRate) {
                    let tagStar = "";
                    for (let i = 1; i <= 5; i++) {
                        if (numberRate >= i)
                            tagStar += `<span class="fa fa-star checked star-tag"></span>`;

                        if (numberRate > i - 1 && numberRate < i)
                            tagStar += `<span class="fa fa-star-half-o star-tag"></span>`;
                        else if (numberRate < i)
                            tagStar += `<span class="fa fa-star-o star-tag"></span>`;
                    }
                    return tagStar;
                }
            },
        })
    );
    app.set("view engine", "hbs");
    app.set("views", "./views");
}
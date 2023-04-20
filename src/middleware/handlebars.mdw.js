import { engine } from "express-handlebars";
import hbs_sections from "express-handlebars-sections";

export default function (app) {
    app.engine(
        "hbs",
        engine({
        // defaultLayout: 'main.hbs'
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
            return value === "";
            },
            isFree: function (value) {
            return value === 0;
            },
            checkTeacher: function (value) {
            return value === "Teacher";
            },
            ifEqualString: function (obj, value) {
            return String(obj) === String(value);
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
            },
            formatDuration: function (seconds) {
            let time = (seconds * 1.0) / 60;
            let duration = "";
    
            if (time < 1) duration = Math.round(seconds) + " seconds";
            else duration = Math.round(time) + " min";
            return duration;
            },
        },
        })
    );
    app.set("view engine", "hbs");
    app.set("views", "./views");
}
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def sorting_hat():
    result = None
    if request.method == "POST":
        gryffindor = 0
        ravenclaw = 0
        hufflepuff = 0
        slytherin = 0

        # Get answers
        q1 = int(request.form.get("q1"))
        q2 = int(request.form.get("q2"))
        q3 = int(request.form.get("q3"))

        # Q1
        if q1 == 1:
            gryffindor += 1
            ravenclaw += 1
        elif q1 == 2:
            hufflepuff += 1
            slytherin += 1

        # Q2
        if q2 == 1:
            hufflepuff += 2
        elif q2 == 2:
            slytherin += 2
        elif q2 == 3:
            ravenclaw += 2
        elif q2 == 4:
            gryffindor += 2

        # Q3
        if q3 == 1:
            slytherin += 4
        elif q3 == 2:
            hufflepuff += 4
        elif q3 == 3:
            ravenclaw += 4
        elif q3 == 4:
            gryffindor += 4

        houses = {
            "Gryffindor 🦁": gryffindor,
            "Ravenclaw 🦅": ravenclaw,
            "Hufflepuff 🦡": hufflepuff,
            "Slytherin 🐍": slytherin
        }

        result = max(houses, key=houses.get)

    return render_template("index.html", result=result)

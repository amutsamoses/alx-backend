#!/usr/bin/env python3

"""
A basic Flask Application
with a single route
and an index.html template for internationalization (i18n).

"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """
    Render the 0-index.html template

    Return:The rendered HTML content from the 0-index.html template.
    """

    return render_tamplate("0-index.html")


if __name__ == "__main__":
    app.run(debug=True)

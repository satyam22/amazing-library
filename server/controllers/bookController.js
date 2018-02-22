import Book from '../models/Book';

exports.index = (req, res) => {

}

exports.books = (req, res) => {
    Book.find({}).
        populate('author').
        populate('genre').
        exec((err, result) => {
            if (err) {
                console.log(err);
                res.send("Error occured while accessing data store");
            }
            else {
                console.log(result);
                res.render('books', { books: result });
            }

        });
}
exports.book_details = (req, res) => {
    res.send("duummy");
}

exports.create_book_get = (req, res) => {

}

exports.create_book_post = (req, res) => {
    res.send("duummy");
}

exports.update_book_get = (req, res) => {
    res.send("duummy");
}

exports.update_book_post = (req, res) => {
    res.send("duummy");
}

exports.delete_book_get = (req, res) => {
    res.send("duummy");
}

exports.delete_book_post = (req, res) => {
    res.send("duummy");
}

let express=require('express');
let router=express.Router();

import bookController from '../controllers/bookController';
import bookInstanceController from '../controllers/bookInstanceController';
import authorController from '../controllers/authorController';
import genreController from '../controllers/genreController';

//router.get('/',bookController.index);
router.get('/books',bookController.books);
router.get('/book/create',bookController.create_book_get);
router.post('/book/create',bookController.create_book_post);

router.get('/book/:id',bookController.book_details);

router.get('/book/:id/update',bookController.update_book_get);
router.post('/book/:id/update',bookController.update_book_post);

router.get('/book/:id/delete',bookController.delete_book_get);
router.post('/book/:id/delete',bookController.delete_book_post);

router.get('/bookInstances',bookInstanceController.book_instances);

router.get('/bookInstance/create',bookInstanceController.create_book_instance_get);
router.post('/bookInstance/create',bookInstanceController.create_book_instance_post);

router.get('/bookInstance/:id',bookInstanceController.book_instance_details);
router.get('/bookInstance/:id/update',bookInstanceController.update_book_instance_get);
router.post('/bookInstance/:id/update',bookInstanceController.update_book_instance_post);

router.get('/bookInstance/:id/delete',bookInstanceController.delete_book_instance_get);
router.post('/bookInstance/:id/delete',bookInstanceController.delete_book_instance_post);

router.get('/authors',authorController.author_list);

router.get('/author/create',authorController.create_author_get);
router.post('/author/create',authorController.create_author_post);

router.get('/author/:id',authorController.author_detail);
router.get('/author/:id/update',authorController.update_author_get);
router.post('/author/:id/update',authorController.update_author_post);

router.get('/author/:id/delete',authorController.delete_author_get);
router.post('/author/:id/delete',authorController.delete_author_post);

router.get('/genres',genreController.genres);

router.get('/genre/create',genreController.create_genre_get);
router.post('/genre/create',genreController.create_genre_post);

router.get('/genre/:id',genreController.genre_details);
router.get('/genre/:id/update',genreController.update_genre_get);
router.post('/genre/:id/update',genreController.update_genre_post);

router.get('/genre/:id/delete',genreController.delete_genre_get);
router.post('/genre/:id/delete',genreController.delete_genre_post);

module.exports=router;
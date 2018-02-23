let express=require('express');
let router=express.Router();
import bookController from '../controllers/bookController';
import bookInstanceController from '../controllers/bookInstanceController';
import authorController from '../controllers/authorController';
import genreController from '../controllers/genreController';
import auth_middleware from '../utils/auth_middleware';

router.get('/',bookController.index);
router.get('/books',bookController.books);
router.get('/book/create',auth_middleware,bookController.create_book_get);
router.post('/book/create',auth_middleware,bookController.create_book_post);

router.get('/book/:id',bookController.book_details);

router.get('/book/:id/update',auth_middleware,bookController.update_book_get);
router.post('/book/:id/update',auth_middleware,bookController.update_book_post);

router.get('/book/:id/delete',auth_middleware,bookController.delete_book_get);
router.post('/book/:id/delete',auth_middleware,bookController.delete_book_post);

router.get('/bookInstances',bookInstanceController.book_instances);

router.get('/bookInstance/create',auth_middleware,bookInstanceController.create_book_instance_get);
router.post('/bookInstance/create',auth_middleware,bookInstanceController.create_book_instance_post);

router.get('/bookInstance/:id',bookInstanceController.book_instance_details);
router.get('/bookInstance/:id/update',auth_middleware,bookInstanceController.update_book_instance_get);
router.post('/bookInstance/:id/update',auth_middleware,bookInstanceController.update_book_instance_post);

router.get('/bookInstance/:id/delete',auth_middleware,bookInstanceController.delete_book_instance_get);
router.post('/bookInstance/:id/delete',auth_middleware,bookInstanceController.delete_book_instance_post);

router.get('/authors',authorController.author_list);

router.get('/author/create',auth_middleware,authorController.create_author_get);
router.post('/author/create',auth_middleware,authorController.create_author_post);

router.get('/author/:id',authorController.author_detail);
router.get('/author/:id/update',auth_middleware,authorController.update_author_get);
router.post('/author/:id/update',auth_middleware,authorController.update_author_post);

router.get('/author/:id/delete',auth_middleware,authorController.delete_author_get);
router.post('/author/:id/delete',auth_middleware,authorController.delete_author_post);

router.get('/genres',genreController.genres);

router.get('/genre/create',auth_middleware,genreController.create_genre_get);
router.post('/genre/create',auth_middleware,genreController.create_genre_post);

router.get('/genre/:id',genreController.genre_details);
router.get('/genre/:id/update',auth_middleware,genreController.update_genre_get);
router.post('/genre/:id/update',auth_middleware,genreController.update_genre_post);

router.get('/genre/:id/delete',auth_middleware,genreController.delete_genre_get);
router.post('/genre/:id/delete',auth_middleware,genreController.delete_genre_post);

module.exports=router;
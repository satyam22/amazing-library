let express=require('express');
let router=express.Router();
import bookController from '../controllers/bookController';
import bookInstanceController from '../controllers/bookInstanceController';
import authorController from '../controllers/authorController';
import genreController from '../controllers/genreController';
import auth_middleware from '../utils/auth_middleware';
import ingest_auth_user_detail from '../utils/ingest_auth_user_detail';
router.get('/',bookController.index);
router.get('/books',ingest_auth_user_detail,bookController.books);
router.get('/book/create',ingest_auth_user_detail,auth_middleware,bookController.create_book_get);
router.post('/book/create',ingest_auth_user_detail,auth_middleware,bookController.create_book_post);

router.get('/book/:id',ingest_auth_user_detail,bookController.book_details);

router.get('/book/:id/update',ingest_auth_user_detail,auth_middleware,bookController.update_book_get);
router.post('/book/:id/update',ingest_auth_user_detail,auth_middleware,bookController.update_book_post);

router.get('/book/:id/delete',ingest_auth_user_detail,auth_middleware,bookController.delete_book_get);
router.post('/book/:id/delete',ingest_auth_user_detail,auth_middleware,bookController.delete_book_post);

router.get('/bookInstances',ingest_auth_user_detail,bookInstanceController.book_instances);

router.get('/bookInstance/create',ingest_auth_user_detail,auth_middleware,bookInstanceController.create_book_instance_get);
router.post('/bookInstance/create',ingest_auth_user_detail,auth_middleware,bookInstanceController.create_book_instance_post);

router.get('/bookInstance/:id',ingest_auth_user_detail,bookInstanceController.book_instance_details);
router.get('/bookInstance/:id/update',ingest_auth_user_detail,auth_middleware,bookInstanceController.update_book_instance_get);
router.post('/bookInstance/:id/update',ingest_auth_user_detail,auth_middleware,bookInstanceController.update_book_instance_post);

router.get('/bookInstance/:id/delete',ingest_auth_user_detail,auth_middleware,bookInstanceController.delete_book_instance_get);
router.post('/bookInstance/:id/delete',ingest_auth_user_detail,auth_middleware,bookInstanceController.delete_book_instance_post);

router.get('/authors',ingest_auth_user_detail,authorController.author_list);

router.get('/author/create',ingest_auth_user_detail,auth_middleware,authorController.create_author_get);
router.post('/author/create',ingest_auth_user_detail,auth_middleware,authorController.create_author_post);

router.get('/author/:id',ingest_auth_user_detail,authorController.author_detail);
router.get('/author/:id/update',ingest_auth_user_detail,auth_middleware,authorController.update_author_get);
router.post('/author/:id/update',ingest_auth_user_detail,auth_middleware,authorController.update_author_post);

router.get('/author/:id/delete',ingest_auth_user_detail,auth_middleware,authorController.delete_author_get);
router.post('/author/:id/delete',ingest_auth_user_detail,auth_middleware,authorController.delete_author_post);

router.get('/genres',ingest_auth_user_detail,genreController.genres);

router.get('/genre/create',ingest_auth_user_detail,auth_middleware,genreController.create_genre_get);
router.post('/genre/create',ingest_auth_user_detail,auth_middleware,genreController.create_genre_post);

router.get('/genre/:id',ingest_auth_user_detail,genreController.genre_details);
router.get('/genre/:id/update',ingest_auth_user_detail,auth_middleware,genreController.update_genre_get);
router.post('/genre/:id/update',ingest_auth_user_detail,auth_middleware,genreController.update_genre_post);

router.get('/genre/:id/delete',ingest_auth_user_detail,auth_middleware,genreController.delete_genre_get);
router.post('/genre/:id/delete',ingest_auth_user_detail,auth_middleware,genreController.delete_genre_post);

module.exports=router;
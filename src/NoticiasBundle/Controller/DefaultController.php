<?php

namespace NoticiasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $repo_noticias = $this->getDoctrine()->getRepository("ModelosBundle:Noticia");
        $noticias = $repo_noticias->findAll();
        return $this->render('noticias/noticias.html.twig', [
            'noticias' => $noticias
        ]);
    }

    //Noticia
    public function blogAction($slug = null){
        $repo_noticias = $this->getDoctrine()->getRepository("ModelosBundle:Noticia");
        $noticia = $repo_noticias->findBy(array('slug' => $slug));

        //redireccionar a 404 - Noticia no encontrada
        if(empty($noticia)){
            return $this->redirect('/noticias');
        }

        return $this->render('noticias/noticia.html.twig', [
            'noticia' => $noticia
        ]);
    }
}

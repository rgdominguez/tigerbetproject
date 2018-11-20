<?php

namespace IndexBundle\Controller;

use ModelosBundle\Entity\Noticia;
use ModelosBundle\Entity\Subcategoria;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $repositorio_subcategorias = $this->getDoctrine()->getRepository(Subcategoria::class);
        $subcategorias = $repositorio_subcategorias->findAll();

        $repo_noticias = $this->getDoctrine()->getRepository(Noticia::class);
        $query_noticias = $repo_noticias->createQueryBuilder('n')
            ->setMaxResults(3)
            ->addOrderBy('n.fechaPublicacion', 'DESC')
            ->getQuery();
        $noticias = $query_noticias->getResult();

        return $this->render('index/index.html.twig', [
            'subcategorias' => $subcategorias,
            'noticias'      => $noticias
        ]);
    }
}

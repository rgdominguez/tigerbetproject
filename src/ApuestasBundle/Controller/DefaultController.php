<?php

namespace ApuestasBundle\Controller;

use ModelosBundle\Entity\Apuestas;
use ModelosBundle\Entity\Juegos;
use ModelosBundle\Entity\Usuarios;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function insertarApuestaAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {

            $content = $request->getContent();
            $params = json_decode($content, true);

            $apuesta = new Apuestas();

            $repo_juegos = $this->getDoctrine()->getRepository(Juegos::class);
            $repo_usuario = $this->getDoctrine()->getRepository(Usuarios::class);
            $em = $this->getDoctrine()->getEntityManager();

            //Actualiza el disponible después de la apuesta (true)
            $nuevo_acumulado = (int)$params['disponible'] - (int)$params['apuesta'];
            $this->modificarAcumulado($em, $params,$nuevo_acumulado, true);

            //RECUPERA EL JUEGO Y EL USUARIO ACTUALIZADO
            $juegos = $repo_juegos->findOneBy(
                array('nombre' => $params['juego'])
            );
            $usuario = $repo_usuario->findOneBy(
                array(
                    'email'  => $params['email'],
                    'nombre' => $params['nombre']
                )
            );

            $apuesta->setIdUsuario($usuario);
            $apuesta->setIdJuego($juegos);
            $apuesta->setApostado($params['apuesta']);
            $apuesta->setFechaApuesta(new \DateTime('now'));
            $apuesta->setDisponible($params['disponible']);
            $em->persist($apuesta);

            $flush = $em->flush();
            $insertado = false;
            if($flush == null){
                $insertado = true;
            }

            //RESPONSE
            return new JsonResponse(array(
                'insertado'  => $insertado,
                'disponible' => $nuevo_acumulado
            ));
        }
    }


    function updateApuestaAction(Request $request){

        if ($request->isXmlHttpRequest()) {
            $content = $request->getContent();
            $params = json_decode($content, true);

            $em = $this->getDoctrine()->getEntityManager();
            $ganancias = $params['acumulado'];

            //Actualiza el disponible después de la apuesta (false)
            $this->modificarAcumulado($em, $params,$ganancias, false);

            //Recupera el usuario después de la actualización
            $db = $em->getConnection();
            $query = "SELECT * FROM usuarios WHERE email = :email and nombre = :nombre";
            $stmt = $db->prepare($query);
            $prms = array(
                'email' => $params['email'],
                'nombre' => $params['nombre']
            );
            $stmt->execute($prms);
            $res = $stmt->fetch();

            //RESPONSE
            return new JsonResponse(array(
                'total_acumulado'  => $res['acumulado']
            ));
        }
    }


    function modificarAcumulado($em, $params, $acumulado, $bool){
        $repo_usuario = $this->getDoctrine()->getRepository(Usuarios::class);
        $usuario = $repo_usuario->findOneBy(
            array(
                'email'  => $params['email'],
                'nombre' => $params['nombre']
            )
        );
        $db = $em->getConnection();
        $query = "UPDATE usuarios SET acumulado = :acumulado WHERE id = :id";
        $stmt = $db->prepare($query);
        if($bool){
            $prms = array(
                'acumulado' => (int)$acumulado,
                'id' => $usuario->getId()
            );
        }else{
            $prms = array(
                'acumulado' => (int)$acumulado + (int)$usuario->getAcumulado(),
                'id' => $usuario->getId()
            );
        }
        $stmt->execute($prms);
    }
}

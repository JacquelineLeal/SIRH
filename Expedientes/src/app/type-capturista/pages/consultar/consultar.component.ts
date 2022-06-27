import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Datos, DatosBuscarInputs, DatosInicialesExpedientesService} from '../../../services/datos-iniciales-expedientes.service';
import {DatosEscolares,TraerInfoEscolar, DatosEscolaresServiService } from 'src/app/services/datos-escolares-servi.service';
import{DatosIdiomas ,IdiomasService} from '../../../services/idiomas.service';
import {DatosDocumentos, DocumentosService } from 'src/app/services/documentos.service';
import {DatosPersonalesTable ,DatosPDomComService } from '../../../services/datos-p-dom-com.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as pdfMake from "pdfmake/build/pdfmake";

import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import Swal from 'sweetalert2';

 
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  logoFGJE_PDF = 'data:image/jpg;base64, /9j/4AAQSkZJRgABAQEAYABgAAD/4QBYRXhpZgAATU0AKgAAAAgABAExAAIAAAARAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAABBZG9iZSBJbWFnZVJlYWR5AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACrALwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAoorz39pX9qnwD+yL8NL7xb8QvEul+GtE09N8k95MEB5AAA6sSSAFUFiTgAnis61aFKDqVHZL+v8Ahl1Kp05TlywV2ehV5D+05+3p8If2OvDX9q/Ebx54d8M2xUsi3N2glmAODsjzuc54woJ9q/G/9tD/AIOM/i5+2Bpmu2v7O+m6f8L/AIW6ZIbPUfiV4ukS1jBY7VNur5zJ3WNEmmwwbykIyv5gfEX45eCdO8d3GvTHX/2gvHP2hvO8WfEKScaXMoZ9vk6d5vnyLhsg3MwAxnyRnaPDr5tVm3DDx/C7+7RR/wC3nf8Aun0GEyKUtar+S/z/AK9T9q/jD/wddaP421K60v8AZ3+Dvjv4sXFmF+035tJLOztt7FUZm2OyKeDmSNR29x8k/tF/8Fz/ANsDXrqS61r4kfA34JWUxGNEivIta1aKMqPmaGEXL7jjgbUbLHAGDt/Mv4i/tL+Pfitoa6RrXifUP+EfjIMeh2ATTdIhxwAtnbhIQADgZUnHGeTnkvBfhO+8c6uumeHdNudYv5Azra2EJmkYAEsdq9gASSeAASSAK5JYerUvKvPTrdtr7tIf+SHv0cqo09or83/XzPsn4l/8FBPF/jqw/wCKj/bO+M2vXEgLyWnhzwvNptvuwTgSvcW2OpH+qAOccAkjym//AGldNmmkkb4xftQ3Uzn5pTqMMQc8ZbH21up3cZ9Dk8ivPdH/AGZ/GWseHPDOtHT7HT9D8ZX02maHqWoalb21pqdzC4jliSRnwCjFQxbCqGUk4Zc2pv2XPE2n/CYeN9RvPDOj+HV8RXPhSWW/1ExzW2pW6LJLbyRKjMpCOrBsFSM4JIIGUcHho6XXbaPp0ivQ6/Z0krXPVPCP7Xa6BeK2m/tE/tUeGGjyY5HdNQRP4sbF1FO+7kdTtOAeB7d4F/4Kw/HL4eX9rD4L/bNtdfMzhVh8c+FbixjiyAu95ngnRWGAeZcdTkk8/F/ij9m7xx4Q+Pv/AAq268P3U3j5r+HTYtItWW4luZ5gphEZU4YSK6spyBtbJxg45vSfBGteINSvbPTtH1PUrzTd/wBqgs7Z7iaAI2xiUQFtobgtjAOMkZGT6jh52nFra+0Ho9nflvZ+oSoU5KzZ+1Xwa/4OK/2qPhdZWjeLfhj4L+NmiA86x8PtZjvpLkAhcmOFp2XBBB3JHzngYxX2Z+yJ/wAHO37OP7S2sQaHrmqah8N/EzARy2XiOEWiLPkgwiXcU3AgjBYHPGM8V/L7o+o3nhXXYtQ0+4vdJ1S1fdHdW0j211A49HUh1YexBr0cftVa14ssPsPxD0rRfilZMV3T6/EV1iJQxJEWpRbblcljkO0injK8VtCniqOtOb+9v8JOS+5xODEZNQqL4V8tP6/E/s98EfELQ/iVocOpaBqtjq9jcIsiTWsokUqRkHjpketbFfyS/sX/ALY/jz9m/wAUWt7+zp8VNU0O8aby0+G3jq+VrO6Xbnba3pMdtIS52qn+jTNgDa/f9kv+CaP/AAcq+C/2kfE8fw9+MOl3Hwu+JUL+Q9pqKmKOeT5ThdyryQxIUgPheFb7x7sPm9ny4lWt1W3q09UvO8o9eY+dxmS1KetLVduv/B/rQ/Uiiq+lata67p0N5Y3NveWtwu6KaGQSRyD1DDg/hVivcTuro8QKKKKACiiigAooooAKKK+LP+Czf/BXnwv/AMEvfgRNKFj1v4ieIUNr4c0FHZZLydsDexT5ljjDBmIweUVSGdTWGIxEaMOeXokt2+y/qy3dlqbUKM601CG5b/4Ky/8ABZX4ef8ABLv4axyalI3iLxzrYeLQ/Dtg6tdXsoO0s3UJGrcM7Dg8AO3y1/Pb+29+1J4q+N/xNbxx+01qM3jHxxJG13oPwlsrqWz0jwmJNjQyaoVbdHujYsbWNvtcgC+bLCMK3N/H/wDaA8WfDD4s65448catJ4o/ag8SuX1C/uNrW3wyiJwLWCPkLqiqGTbt2WaEBc3BLQfLNze/abueaaZpbiZ2mnlkk3SSOeWd2PJY5ySeTnJr5zlniqntqj06W/8Abey7y0lLpaNk/t8vy2FGH5vudT8XfjT4l+OmrWN14l1H7VBo8JtdI06CJbbTdDty27yLO1QCKCMHnCKCTySTk1BoPwv1PxBpt5crNo+n/ZdMbV4INR1KG0uNThDhAtrG53TSt8zJGADIqMVzxnoPj/8Asi/Eb9m62spPG3hXUNN0fXFC6Zrlsy3uj6qGQuBb3sJaGRtoJKbt64IZQQQPXtX/AGtfDfib4nfDX4meDNG1jRPjNo9hp2han4dt9HhvdI166s4IrO1urWRmZ4TNDFGksSxeYGXMbZcsG61qaeGScdbW28tuj6voem5WXubG5H+zN4Rsf2bvDfizwPY6L4lX4naFPog0vxU0lz4itvEFvepb30ViLYLDbSW8MlteRtIpZ4ZWUq5DZh8U/tQRf8I/4a8P/HLwv4T8Z/Ybc22n+IfC15aWPjHwwYZpYWjlkgHl3NtKEkcQXSkGO4yjrkZ4r4RfCb9o39pLSvFHw38F+HfGkPhnTfEVzq3iPRYVbSdD0HUnBimN9LMypCyRqUK3EhKxxHOQpNbr/shfAX4BK0fxW/aCt9f1aAlJPD3wk0f+3ngJGf3moXBitAVbgqm/J3YbjNcE1Tu41pczu2lG7kl01W2lld79XZ2MFb7T1M34V/tc+GPht+yM/wANDZ61d3DeLtWv/twsLaWNND1HSxp91axCZ8xXUmyGVZVUeWyEfMDtMngX9vPTfgr8DbXwl4K8I3kN1p/xAPja3l1i5ivdPubcQrbDTbq3K7pUaGNd8odX3s23aMEXF/aM/Zg+Gk7W/hX9m3XvHUan5dR+InjqczOM5GLXT0iiU8cks3XHTOWL+3/4AslZbP8AZI/Z7RSMD7SdWuCMEY5a5HbOfUkHtg17JSbfsJau+rir/wDk3m9H9xXL/df9fI4m1/aE8KeFPiLrvjbwtoXizSfFt9rsGpaX/aOrDUrTSbYXCzyw+bmO6mfckapK77vLQo+4uXHqvgn9qP4e6R8fv2h/it4d1LUvDfizx3omp2ngrTdQhaN9MvtXfZf3Bu4v3cXlQNcmHDBi06LgsCDhyft0/CXWFkj1b9j/AODEsUhO4afrOsae+CRnDJOSvfp0z+bBqn7H/wAWl/0jSPjn8E9QmB+ayu7TxhpUTErgbZRDc7R8x+8T0yScU6kV9ulNaWvdS0utGlJt7du+uonHTVM8S1D4QatqHjzQ/DPh27s/HfiTxHDbNbwaA76gGurgkJahwMyzLlS+0YVmK5JUk+pftX/s2+D/AAb8ePiN4R+HOoahqH/CpdKWXXbm5nE1nqV3bNHDqZtGC7kiS5kKxCQnckTDcWxne0n/AIJ++Np9SXxN+z38R/DPxgm0mQXds3grUZ9L8WacApYSHTbgR3KuMHIhMuO/evNfC3xz1Dw0dQ8D+MI9S8OeGta1FV8dHQNGt7TxPqkCy73gkabaPlYFhGwRS2CwbaK3jWdSSlSnflWq2e6vdWvsrJab+jVuTfws4DxR4B1jwnpmj3Ws6PfafY+JLQahpU9zDiDVLfcyebC/3ZFDo6nBJVkYHBBFdrofx0t/F+gWXhv4m2d/4u8O6fEtvpuoRSga/wCHFG8qLW4c4khDPk205KHHyGI4avbf20/2htJ+LHhDT/E3hvSfCNj4TnjvPC2iaFHry3cmj6ZEANPtl005ktXt0xczXDkefdT5VsKyN8xeGPAGteNvDeu6xo+m3Wqab4Xt0vNXmtUMv9n27yCMTyBQdsQkKoXPALrnrkbU5e2pqVZcrv32d7bp79PPbyLTU4++fqR/wTF/4Lk/ED/gnXreieHviR4gHxM+BeuXS2+l+LofMZ7QlV3Rzo/7yOSMFQ8bASJtZgJ49pr+hj4J/HDwz+0P8OtP8VeEdUtdW0fUI1dJIZFYxkqG2PtJAbaynqQQwIJBBP8AFb8MPifcfDe+vIZLSDW/DmtqkOt6Fduy2erxKcruK/NHKmSY5kw8bcjIyp+6v+CUf/BULWv+CVvxL0m+sdU1LxR+z34un+zYvuLjQ5wpZrS5Vd3kOrSPIdoIdcTRrtMsZrD1qmElZaw7L80uj7xWkt42d0eHmmUqr78NJfn6/wCZ/UpRXM/B/wCLug/Hb4c6X4q8M30eoaNq8ImglUjI9VOCRkHjgkHqCQQT01fSU6kZxU4O6eqfkfGyi4vlluFFFFUSFFFBOBQB5P8AtrftfeE/2G/2c/EnxG8YX8Nlpeg2rTBWOZLh+Akca9XdnZVVRjLMoJUHcP5bf2kf2zfF3xR+J19+0V46ZG+JnjczL8NtFuJvOh8H6UJHjOrGMrtkbd5kduTtDzie4KgRxhvtD/g4S/bgtf24P21H+DsetNYfBv4IWr+IfHF7bSNIt9KgXbbKQAPMdnhgjBOBPcg/8sga/Jj4tfFLUvjP8QtQ8R6kkdtJeFY7WxhJ+z6TaRqEt7KAfwwwRKsaKOAF96+ZrVHi6t38Kv8Ac/8A5LfyjZaczPtcny9U4c0t3v8A5f1+hgwwXOqXExX7ReXGyS6nkY7nKqC8krsfxJY9SfUjP1F8HNG8E/tn/sy6f8NdSgtPh/8AETwbHcHwv4vvysWh+KkSOa5n0e+mColncBHkminYsJMFZTny2qX9k74DftKfAzQoviR8Pfhjp/jnwr4u0dY9RtXsrDxBZa7pMpy9rdQK5uYYnZMMAInDx8HKg15j+0X8QPBep61qXhX4OeHPE3h/wf4oubDUL/w9fXX9qz22qKrL/Z1rMAHnt4ZZWSN3USynbuJ2DPPOsq8/Z0mnbZpp2a0fMunXTZ66p7evOXM7LoHiH9pvxUvhOTwJ4J8ReK5NJ8X2NtpfiDSoNslp4g1DzF3yWlvGo+aaRI/3pBnkxjKq2yvuD/gmB/wSMh8JftE6dqvxEupdW+I3gNLXxRN4O0ucra+Cz5ga0bW72PJW9kKvJFp0BMrCNXkdUyreC6vqtn/wST8Pf2Po72Op/tS61aFNc1fEdzbfCa1lUMtlYnlX1eRCDNcg/wCjqxiQbi7n6c/Zu13xt+yl/wAEpPgbeeErfWr7xp+0d8Wre68RXMJeTUdZtJJZP9GNwfnjM8MDAyLkkNP/AHnNeTmuIn9X5cPaKqPlT25tNZeSsnZ6N6a8u+cpNL3dvzPlH/grT+0z8S/Hn7S/ibwTr/xA1TWvCej3AuLfSbNUsNOiedRMyyxQnF1KnmbTcTM7uCeVHyL8lxxrCm1VVVHQAYAr6y+Kf/BPf40ftVfto/HEfDf4R6zPY6H431OG5t7eWOO00otcu6QCeZ1V38tkfapOBIvCqQB80fEP4c+IPhH411Dw34q0XUvDuv6VJ5d3YX8JimhPUHHQqw5VgSrAggkV62WSoRowoU2rqKula+y1aW1zqouFrLcxqKKK9I2CiiigCbTNQuND1aHULG4uLHULU7obq2laGeE+qupDL1PQ9zX0RY/txaX8ftItfD37Q3h1vHUFvH5Fj440xY7PxfoQ2kBmlCiPUYwduYrkbiBgSLXzjRWNbD06tnJarZrRr0e/6PqZypxkeu/F/wDZ01r9myfw78QfCeuWHjbwHeXsVx4e8Z6fa7rf7VC4lS3vIH3fZrpCFLW8pIbnBdc16npP7Q2rftr2sfw0s7zQPgz4b1a6vfHfxT8YXd9Je3niS4ijkee9udqI8kUUcjpbaZbqEaSfkMx3r4f+z7+0lrn7O2t3zWdrZeIfDGvw/ZPEXhfU9z6Z4gtiMFJFB+SVQSY5lw8bcg4yDvfHT4Q6d8OYNC+Jnw01K91L4ca9dFNPubnY974evsMZNJv1wVMoTdtZhsniO4DO5RxTptyVOvv9mXn5rbmVr7WdrpK1ljKOtpb9zP8Aj7Y+C/iV8RvFevfB7w34i0fwHoi26vBq9zHJdEfLCbtlUKsbTuGmaBCwi3nZ+7GE5f4Y/EGHwRdahZara3GqeFPEEa2+tadDJskmRTmO4hJyEuoSS0TkddyNlHYH6P8A+CevhHwj8dvih4R8OatodjrWt+IF1rQtLsLvTVTw5oWsyaeTpV1JbRkvdmWVHDvOQi7eAwjJHzl8QfhlqHhHT9P1ldHvrPw/qw8iC8WCZtO+2xoPtVpBcuuyZoWILBHfZvAycZOlKpCTeGlfRLfd79d73Td9+vZsjL7Ej9XP+De3/gqFd/sV/tBR/Ajxt4gXVvh54mCXHhjVzIBbvFJjypEJyAAA4KK2UKzREMYY1X+h9JFlRWVgysMgg5BFfxNfD7V7rxl4Rbw7HK8GveGWk17wnfI7Ca3mQrLcWigdRII/OjB4E0ZA5mbP9OX/AAb4/wDBRaL9vH9iXS7fUp4/+Es8Fxpp1/EXTe6LwjBVxwo2jIAG1o+5rty+tKlU9jPaW3k9X90t/KSe90fM57gLL6xFev8AmfelFFFe8fLhXz3/AMFSf2w7D9hr9h/x74+u5IBdafpksdhFLhhNcuuyJSp+8DIyKf8AfFfQlfin/wAHYXxmuviZ4r+Cv7PVhdvDa+MNbTUNZMSkyQwRFct0IKqsnmeo8rgHJA8/MqvJR5V9rT5dX8opteZ3ZbQ9riIp7LV/I/GX4v8AiPVvDPwS0nT9Xkum8YfFu8b4g+LLqRtsl3BI8n9mxMFO3a2bi7wRz58JwNormfgt4S0e8bV/FHivRdf17wT4SWE6zZ6NcfZbyT7SZIoCLgpIlugkUEySIy52JgmQCqvx6+IFr8U/jR4l17Tofs+k316Y9MhznybGFVgtU7dLeKIHpyDwOlfU37Gvw91n9lD4XXHxhuta8W/Dm1vLH+xrW6treG//AOFoXGoLD5WkWdhdL9lubC3j3zXVxIWBbaqKGAavDq1PZYfzfTzfTTVdk1eys+h9/wDBBLqz5o074gaT4Y+G+pW+n6fqS3t9fm58L6zFdpa3+kxrMouIrl41/wBJjeIKVVCqxzPIwAyQfaf2WJbf9hb9nlv2g9Ss7ab4heJp59B+EemXiArayIpW88SFM/NHbcwwEggzvuAPlnHmPgfwF4k/bh/a+0LwdBdaPHqHi7WxpUM+m2UOm6XptoJHeWeGCJUjhgjhE021VyADwTVz9vD9oTS/2iP2iL648Khrf4c+DrWLwn4HssALZ6NZAxQtj+/MwedyeS8x6cAFSLnJUe+stXtsl8/lon1YuW75Pmzx/V11DVrTUdVmbUL6a5ndrrUJi8zzXMgLkySnOZX5bk7jyexr9kf2vPBOufF//gnJ+yovwp0e41DS7HxB4Z1EvY3EcJ06JLVkSRGyu0i4EqM+QY3XBI3gD8qPgky+JIdY8N6hD9q0O6jXUijXc0CRX0KSpa/6vkmVpnhweu/gggV+0n/BND9oD4Z/tvf8E+7HwjZ+E9F0OPQoYtC8Z+ELS1MOnJE8xmHlb3Z/KuQvmO+8MH8wM4JXPi8SVp0lSrRjdQlr1VmrLS616Lp96Jr7npv/AATKvbjSPg74i8J6pBe2Pivwn4u1uHxLbXb+dM99Pfy3S3LTbmWRpoJ4c7WfaYypIKgH8xP+CwHhm3+P3/BQ3wh4B8HW9v8A8JJfLDoM1zcobOz+3TSAxW4mI2NHGjIxdcqgnCgAKa/X79mf9lzw7+yb4Ht/CvgHS/7L8JQwTXMkty7XN7eahNN5hkuJGAZsqWAJJIWNFwNu4/nN/wAFBPhhr+n/APBXr9nnxTDot3FpGpXehrq95aFzaw6pBcG2KSuC0MUvlJABnDMmxjkEGvl8ixVOWaVK0eqk10u/Tz1srvpqzOMrao+erf8A4IDftDXJ+VPhyuTj5/FUcfYn+JB6dfceorQsv+Dd79pK/Zdtv8OFDYyW8VxfICSMsNmRgg8YzwR1Ffs98J3+FaSTD4i+KvE1j4g8ReKZNF8M6XYeILqz+1xW+mWlzcGOGKREEcKSyzzTOAqKdztwteBeI/8Agop8G/h3+3Z4N+HfiFr6L4afEw26+HPEkHjnWxqEEc7SR2+o3AfFp/Z9y4j2OsokjVg7ZXcF+tp1M1qwpzhUprn2TUm9r9Pz2Of+0Z3lFJu3kvw1PzmX/g3N/aVaPd5Pw2U4ztPiuPP8XH+rx2H/AH0PfBff8G5v7S2nxs0kHw3woDHPiqNfl5O75oxxgA/Rh74/cf8AbQ8PeC/2afDEv9l3XxY1S9iudOXXrjS/Ft7JN4b0+8vBbLeMrykPKXeTyotrlmV3KOqOpyv2LNG+Hn7R9pfaHf678Ur9tG1rVdC0DW9V8WXSyeLIdOnME022OUKs64UsuyMyxlJVTBkCb/Vs79p7P2lK/pL+v+DpuYrOP3ftLO3ov8/632Pwm17/AIIUfH7w5bNNdQ+AVWNtr48RrlDz1/d8cjHPciuO1v8A4JMfGTQCftFv4P443LryFSeDgNswTjJ4PY96/ZH42fEzw3fftB+PPBfhDwSkMPgDWo9Bv9W+I3jzXLBdTupY1CvZQwthoFYhC0kgMnmLsXazbvFvE1trWsfCDxdqniL4eWfw91rwf4h8P2cN/o3iHVtQtmTUHla60W6gvZ23XMdusMrShUIW4iGEIUtgsVj1UlRdSm5RV2kpX0VzqhjZuKk00nbt126n4u/EbwBqXwp8d6p4b1hYI9W0Wf7PdpDKJY0k2hiAw4PDCut/Zw+NFn8MNa1bRfE1vJqfw88bWh0vxLYKx3LGSDFew84W4t5FV1bByAy96n/bQiFv+1b48jG7EeplQGJyMRp1zg/mF+grzGvdjFV6C5/tJP573Xaz27HpW5o6no3jXw5r37IHx+1XR49e1i1a3VYv7X8O3klm2r6Vcqskc0LqfmjkhZW25IJyue9ew/FTUfg/pfw6vfhB4V8Q+JvFh0uMXtx498U6hLb2TzQo721toWjxM4RZmdIy8pd9pY/ulJrzW8nj+Mv7JkMz7D4k+EdwtuxDANcaHdO207emILkhSeu2QZPQV6L+wP8AFpLCwuPDuiaT8E/APiSxSfU9Q+LnjS1e7uvDlgDGqJawsHj+2eY7LEyRNK+8KNuzevDW5nDnlfmi7Ozsm1tJ9bW1sr72s7HPO9uZ7o+Z9O1K+8K65Bd2zTWOqaXcrNET8kltPE+Rn0ZXXkHuK/Qz/giH+2Tb/sb/APBS/wAO38Nx9l8BfFqAS3Kz/u47R5cm4XgBf3UizfKOohhHJFfE/wC0n4ft9N+Kmo6hZePdA+J1rrU0l1J4k0qCe1F/c5HnGaC4RJY5Sx3k7SrhwwPOBD4a8RS2nwwh1SOY/b/h3rcGq2iEbSLed08xYyOd3nRIxJPAkJ64z2TvOCnHR/PR9Oz0foFeCq07S2asz+2wHIorw/8A4JvfH5f2mv2I/h34vwFmvtKjguFBziWHMTHPvs3f8C6A8D3CvoaFVVacai6q5+b1abpzcH0dgr+ZX/gtr8bJ/FH/AAWD+LXiSG9ef/hU/gW4srCZQZFs7ycNBCMHowe+XGehUY6AV/TNe3H2SzmlOcRoXOPYZr+Rf9tTxyvib4u/tia/M2671TxhpGgxuAGZVW7ld0yOgH2FAemdo6YxXk5tJOcIPz/OMfyk7fM9zIKd5yl6L7/+GPl34ZeCL3x5498PeHdL0++1i+1W/t7KCxtADcXm51BjTJA3MuQCSAOpIAJH0x8SfjL8I9A0Lxv/AMK31b4yfDvxF/Z17pY8H65d6brehwxTSqr2dnfj95B8r7gFi3Hay+aCAW8B+Anivw34F+LGl6x4us9c1LQdPSd57LRr77Bf3bNA6IkVztYQHc4YybTgKQASQK9I/a9+Lvwh+L+h6FfeAdH8daPrWn21tpU1prsOlLDHbQxMDMs1hFCbi4kkCs8k6bsu2DjGPPxMHOrGLT5fLb5p7p+mnc+vnG80jW/YavZPg78DP2gPi1aq0Oq+F/C0HhDw9cgD/RdR1qY27smf4xZR3eCPu7s47j5vijWGNVUYVQAB6CvorWoW8N/8EjvDflmSP/hNPi3fzXnOBcjT9MhSH0yqG6fHUZZunf53rXD6ynPu7fJafnd+V31uVR1bkdF4YmGmeHJrhQZLqe7zHF5jKAtvE0u89iC7oCM5wrEAnbj6v/4IpfFTTfhJ/wAFN9N026kvLix+I9lceGbSZU2rJc3YjntpJkH3U8xdjFfmG8kcZr5CvtYtLOLTLPfCslrYzPM3zRO0sysxBPU7V8sAgBWUDPBJHcfsseK/FWkftN/CnW/hvp8eu+P9P8QWa6PpeBLHfXcMieUj5YELIhCsxKhQjNkYzWeOw/tsPUpy+1Fr8NH5WIqWaP6XPE9quoeHdts0YbfHG08qNKFgYguQSwB/gO45xgnIIIPlHwR1vyfiB4h8L3tpcW81zI11HJMgC6lDGyxvGSzh3kgDxNvwSqTqOcgV6jrV5dxeGrcKtlpqxzWsrQC5+0QS7Vy8KP3AY4SUk5CklQG4+FfjF+11N8BP+CnvwVX+zbPUvDHjq8udBu75y/8AoaziOBIoskgyxkROH+64IG0bQw/GsDh51nKnDezf3K/6HMtUfQHxK8B6p4z+FHi7TLT4cXHjbTbSW9nv7q10iXV7q7e0t9Plg0WPyW82OR7iNLnduQSyW9vHI/l7gfk/xv8A8E5/H/7SHx38J/Dyz0vxfrmhfEXTo7q1vvGPh2ayvvAltBawQ3ltfKAscAjV412wSMJJ0VE2rJlf1t+BPxL0n4GeEPFiQW99qniHxDqyX+n6RF97U7uS3gtUhhODsBNurSO3yxhmkYhQxr2H4M/Cu98H/bte8SXkWreNvEQRtUu4mY21si5Mdnaq3KW0O5gowC7F5HG+Rq/WclwNPGUKGKjUbtFJrorKzXdO/nt5WPCrZhPDynBR72879fkfO8Xwy1Pw78ANW+FvhPVv7K0XQ5LPw74l+IHi2X7frWt3yxW0RnihGfNl8sW6q8jIBlEiQKisPYPh/wDBCHxz+y9pfhvWruL+0rV5Z4NX0y0FlLZX8dxIY72BSz7ZFf5tzM4k+beXV2DfJvjz9q/wv8D/AIgeEfhV401jxN4Q8e32sazpPhW+8PWCahY3EgcrHPcFv3e6SCZxsm2eWYHORtV6+vP2HJNU/wCGV/B8OreHdd8LzWdobSCy1vC6m1tE7JBPcxhn8maaJUlaIuxjMhUkkGvqKcKbqt21tb5dvL9Ty6/PGmnfrf18z87f+CjnxBl+Gf7Ylxq3xi0+58N6F/wgUXhl/ElhpFvq2najd3U0kBu44JQy2byibYTOdwWDykdsZfz7R/ipoPjr/gktrGiaHqx8Rf8ACD/HGz0mbXSI862u+GaG7Yxs6iTyZI0bMm7dCXJiVl2/rn8dPg//AMLY8OQNY3FnpviTSJDPpOoXNmLuGBmG2SKaEkCaCVMo8ZPdXUrJHG6fFP8AwU/8TaHq37A2m2GmeG9P8E6tovxB0SLXfD1tFHH/AGTetKJH5jVFkRwQ6TgKJEKtlDnZ5uLwHs3Vr8zs4y0drarp16a9zuwuMVRU6XLqmvw/r+tD+c39tQbf2sfHy427dVYYxjb8icYwMfTav0FeX16h+2oNv7WPj5cbduqsMYxt+ROMYGPptX6CvL6zwv8AAh6L8j7Sn8J6j+xxqUTfHvS/D95ubSfHUM3he/TOPku08tH5GCY5vKkUHHzIMENtI5/4KeA9S8c/F7T/AAPb2Nrq19rt4+jmyur3+z4bidS20+eSBCwdPld/lXPzDbnHLaTq0mgazY6hDu87T7mK7TacHdG6uMcH+76V6b+0m8XhD9sPxBexWlreWtzrsOpi1cO1vdx3PlTmJgp3eW4lKlVwQrEDnkzKLVVtfaX4r/h/wM53u/Q6L9pf9n1/g78KdGh1Dx18E9SvtHn8mLQ/BWsx61qhM5LTTX91GDGxQiNQFkYKAQqoAc+Y/CJI9Q8SX2lzLuXXNKu7BDt3+VIYzJE4XuwkiTHIOTxzivXf2rv2bfBXwC8LN/bGveHtJ+KV9IHHgfwbf/29p+jKzszm+vGcrbMQQI7eKW4cKAZCrEqfG/hDJ5fxY8M9vM1S3i4xuw8ioQM8ZIYj8azwsuag3e++trfd3Xnd37k09YM/oy/4NLfjZdfET/gnvqXhy6Kt/wAInqxWDBPEUgZAMHngwNyepJPrX6oV+GP/AAZ0+KpdM1D4weE/Mzb2kgmRAMAGORFz+PmkgZOMkcY5/c6vby2S9k49m/xd1+DR8HnEOXFy87P8P8zP8XRyTeFNUSFtszWkqoQcYYocc1/Hf+0svlax+0ftDKsfxPiGGUBo1ae/Kq2xQFP3vlzgEMNq85/scuoBdW0kbDKyKVI9QRiv5Jv26PBn/CFfHP8AbM8Nzb1ms/Eui63FG5O4r9t2Mcc8gXoyOgPpjFcWaXVWHb/7aH+f9dfR4eklzr0/U+OKkurSawupILiGa3nhcxyRSoUkjYHBVlPIIPBB5Br7Y/4JY/8ABN/wP+2P4j8P683xY0B9V8Pahb3mr+BrvTZYLuQRP5pj8wkiaJ1jI3RqB8xzjBI9G/4LgfsKeF/Af7RHjT4sXnxC0nw6vje4/tKDw41k9xd3V00YV/LwwyHkUZc/IpdicYKjx5Z3h1jFgnfmt2e+lltrdXd9tD632y5rHzB8XI2k/wCCXfwLkXa0cfjvxbE2F+ZG8rT25OOhBGOeze9fPlfQ8+fFv/BJCz8lY5H+H3xbm+2gOC8Ueq6YvlPjqFZrJl7jKce/zxXdhdFJdpS/F3/Jk4fZrzPsX9kf/gtf8Rv2UPhpY+EX8D/Crx9o+k262uny6/omNQtYlZisZuIiplUbmA8wMwAUBsDB9Y/4JM/GfWv27f8AgrJpnibxZa6Bp914b8Ja3daPY6Pp6WVnp7+SIl2hfmLDz2JkJLHA7DFfnFX3Z/wbp2E0n/BRl9QUYs9I8H6rJdvsLbRKIoYwMfxNI6gDnvXkZxgcPSwlfEU4pTcXd/L9dia1OMYto/bLxxced4UhuNsYmDxyxqxEke7HRhkb15PCnn6ZNfIf7YHx38S694w+GtgNB8LaTb3njnTLW4lm05LmS9tzK0dwqO/ypKGMfzpyR/eJNfX3j7UrXTW0/wAxfMmk37VdlVJNpDNGQ2QwKjPTIKjA718EftSa41r8Q/hTYLYrCrfEzRYmj88sLeNrpz5YYliNpViGK4+8S3cfmWVRTrK6vv8Akc8Vc+ix8cPFXw58catq2hatDp8nhm+TT7WU24uWtPtVqnzGIna6M0vIYj5kjPHysfTNC/4KCeKfivrN9F4R+J3iTV7izh+0T2Wk/DBrhLK2QSRm7kuJNsPlPLDJh1kZcq6AkqdvzH+0L4jvdF8Yavpd88mleDdWkvNb1m+ubWU29xa6ZpVvM0JmHyIgZpJNzZ3sgjUlwM5v7Gfx48Xa18EPBHiz4g6Bo/iHwb8Xn1HRdH1mGe30uPVfDkK32n3GneJr6Q+baxLGTPZyQBvMkj8kxpI8Sj7rIMLVbnGlVlCGkrRtu9HunrddOluuh5+KhBwU5RTe2ppftRftX654r8A/E+bT/HWiatF4m0Vk16wvfBP9my3TW1qZ4ZfLZ03XABEqzxs6gJEykrgn6o8CfGH446NZ6bot/wDFIwzf2LZapYM3gq3Y3mnz2waGbJkyXEiSRSL95GVSQRImfg/9o3wvp+tfDK90WbXNN8WWnwP8FWfg7QbzR9Uku9KgW10l4opmDpGV1NIp3FxG64gLxjKbvl+3P21Pj5Y/Bj4B/CHxZ4g1q18K+Hfh/wCF9H1PVvt9vcJH4hsr1Y7e6trSbaqG7t1hinSLJkd/LXYuQ1ehzYyVLEU8PWk6kNm1G7a1cdN73063/HOrCkvZpwVpX6elnseiar8TfjBZ6Yzw/FzzrgFQFbwbYorktjvNx1XHPUH1GPz9/a1/bM8ZftLWfgy+l8feHPFXhtvFFrbzXOm+HYbGTUhbzTlLe6k8zcPs1wGdYyI/m+YcM2eN+OP/AAWH+Mdz8VtO8TeBvAy+Hfgvco2g6dJ4u0+43a5qknlzJd7bPfPLLHFjbZQEsivJ5uC4xwknwi/4VV4f0O5aXUvtXi7x7beKruK/01dJktpriOQOfsg/49NxAYQtIXVSA0pYOq+PTr5rGlfH1fitaOmu901bS2m3p107KOFoxleMVf0PgD9tCIW/7VvjyMbsR6mVAYnIxGnXOD+YX6CvMa9Q/bUG39rHx8uNu3VWGMY2/InGMDH02r9BXl9faYX+BD0X5HsU/hGXI3W8gxn5TxjOePof5GvUv2yFx+0Nqzb2kY2OmbmJzk/2fbZ7kHnPPfivPvDPh2bxh4m03SLZQ9xq13DZRgjPMjqg47/e6d6+itM0f4Q/Hz9uzxlpPxM8X+JvBfh/VNUOnaJr2mW8N5aWssQEKLeIQWELeWqB4funqCp3Ca1RQnzu+ieyv1j0Wv3ESlaVz5qMEptzcMkzQvKYzOwJV5cbiu89XwdxGc4OT1rV+Hn/ACUPw78pb/ia2nAH/TdOfw6/4V+z3xv/AOCK3g21/wCCe+g/DW0+IGheE4fDfiCXxbN4v1SPbbXIkt2Rmk+Ybg8QhAIIJCjqMCvyTm8AaH8P/wBp3StD8O+MtJ+IWmabqVs/9t6baXFpZ3Mkb75Fi85Q7KpTAlwFYkFeME8OX51h8dGfsr+7fo9ujva2vbciNZSVj9bv+DR5ZD+1f8dtu7y1a7Ljdxzdx44z7ddvY/Pxtr97K/Dz/gzo8GyXul/FrxhJ5eb6cQrtXAw8gJIJOSC0LDqQAoxjJFfuHX0WWRapy9X+CS/NHwudP/amvJBX81f/AAXU+AV14X/4LKeNNFe3js7X4w+ALpdPlkx5c1zFFLJHn3MlpEBjLfOvc4r+lSvxr/4O0fgNeeH/AAh8J/j3o9rHeXXw51+Iahb7ihuIHkiAVio3bC6xoTkcSHrkYzzam3CNRbp2+/Rf+TcpWS1eWvyv7S/4J+Nv7AH7di/sHv468U6L4Zttc8feItJg0jw5eahh9P0JHdmubqSPIeSbbsSNVIA3OWJHyNN+1r/wUC1r9uD4Q+FbH4haat98QfBd0y23ie3IT+17GRWDx3MfRZlfaweMbXychSMnzP8AaQ8GWfgb42a9b6TC8fh/UpV1nQiej6deKLm22nABCxyBCV43RsO1cMzBByQOcc15awOHnVWK5ff0d+q0tb0tutuu591GEWuc+j/+CflmPi34b+NXwZDY1D4neDmv9AQsdsmr6PJ/aEKYHJeSFLmJDz8zgYORj5vgmFxCki52uoYZ966r4TfFHxF+zj8ZvD/jHQWm0/xP4K1aPULVZY9rJPC/Mbqw6NhkYMMYY8V6d/wUI+DGjfDz4123jDwTDt+Fvxfsh4x8HsBxawTsftNg/LYltLnzYWBYnCo3AYCqi/Z4hp7T1XqlZr5pJpeUn0Evdqep4TX6Uf8ABtt4jm8NeN/jpqsdheXmn2vhSymM8AAjM0d8rLAZSMKzhjxnlVJwccfAvwA1DwXpPx18H3XxItr288AW+r27+IYLRWaaWzDfvAArKxHQsFYMVDAHOK/pE8LXHh/xD+zi0fgxfD7eFdU0tp9Jm0SKKHTbmMLiEoIwg5BUKX+fO4MOMH5/i7H+ywv1dwvz216Kzv8AN6eRGInryEX7SUE19ongDVLeRFZdUtJhsRo3ZpEDOQWb5TGHKkYJ5H3W5r4n/bA8eW0Pxi+B+iww20cuvfFPS7ya+eIyNdiGSRwAGz5USfuzswSzSsxJKrs+q/Amh6l4q+NsK61cXrWPhHQoYBAFZYUcxqBAMfL5hbeMAAsSTuPWvzR/4KLftUWngL/gpf8ACvT2+2atafCzxFaapr1ppybpZb2W4Rnhh6FnSMKFXPJk6jOB8bkWGlVxCpx1tGT/AAdvxt95jHTQ+9vHfw98YfFbx/408G6R421LwDDr1j5sV9AIr5Zd0EEaK9pMGjkjMg2vGcEpLvBBIavC/h5+wT8bv2TfjXpnhvQ/DOlfFPSfFmrLr/hb4g6M7eHbP4a3jeWuofb7RVlhmspo44JJLJ2MU7QIVwxYH0j40fFrQY/jb4i0mb4mfB3TbPT7izt57TVdf02K+tHhfdfQ3dtNmVHQDjY27KYYMMqOfsfHXhexttPsYPiL8AdQt8pHeXS+LtJi1Z9t3LL5inY0G2WxEUPl7Blg8hYbjXp4PF4vDXq0Wve6ct+mjvpK67bdjJ0+aKizV/bD+Hmj/CT4C6p4V0G3S10Xw/4WvbW0TyhCZCtrcK87ICAJpSDJJgHLuxwOq/efxC/4Juaf+3P4I+C+peNfFEmp+C/BvhGyksPBt9piXWlSau1uqjVbhN6rcSpCxijimR4kDykITIa+JPhdaeE/ixoN74RvfFP7MPxE8Y+Kobazj03TL+wVb+XdJ9paw2lZo4/szWxVN3nq5uZFYqVFVfFXirw/4PtfBOhL8TfgXpc2h2MmmeLtOh8bWpuVmWYBTazXDSyfatogTNw7RqGbKszkDryLNY4Fzp1Yubevbzv3avptZs58Zhp1uXklyteV9z7t+OX7H2ofBmdfGWk3viDx5/o66dd/2hDHcXnhy28ojzNOht4kWGAyLF5sFvEpwS4yqbB+Y/7TfiOy8TePvDdvp1419dLryX/l+W8dx5EJmaWYxsEZVXGCwCKWAALHG3F8W/EebT9MuZv+F1/BW61D7LPLZS2Xie2SOOdtrxo6EsZLdFw5K7ZHV1DhDGGbj0+PWnaHPYy+JviF8L7y3t7W5s9TvINdglvZHDLLGysqqzRRMQhhI3kyM4HyrW2NVDE4n65Si1JrVXbW3S6v20W/ZGuEw9SlDlk7/Kx8C/tqDb+1j4+XG3bqrDGMbfkTjGBj6bV+gry+u0/aL8f6f8U/jr4q8RaUJxperag81p50flyGLAVSy9FJAztAGM4xXFMwRSzEKqjJJ7V9photUYRe9l+R60dInqv7HdrHpnxhPi673f2b8OdPuPE9yVXdloEIgTH+3O0a9R1PbJHK/Bb4j23wy+MXh/xdrGiw+J10O/XVH02WYxQX86ZdFkIB/debtLKByoIx2ruPG1m3wJ/Zg0nwzMrW/ir4mTxeItXT7ktnpEW4WNtIv3l86T/SsNjKiM4wQT47WdOKquc3s9Pkr/q38rMzj712fWHi7/gr18Svjn4P8e+GviXJZ+INB8b2UkUMNvAIxoU4CtE0Ck4ZBIikhiD1OSQBXzr8I/J0q51jVLg+Wuh6HdTo4xtWd4zBEvTHJkJHAyVx0zXM16F4I8I3eseCND8PwwZuviVr8cKYUPJLZWrhCQP4VE7THceP3BBOKmnhaOHg40oqKe9tvP8ABCnFRWh/RV/waofAO5+E3/BONtevI5I7jxjqj3KI4I2Rx5wMHuGkcE9yDX6cV5L+wj8A4f2Yv2QvAHgeOFoZNE0iFbhWJZhM48yQEkAkhmI5A6YwOletV7mAg40I363f3u/6n5zjq3tcROfn+WgV47+33+y3pv7Zn7I3jj4d6osfk+ItMmgidozJ5MpRtjhV5LKTkY5yBXsVFb1qMatN05bNWOenUcJqcd1qfxi/F34c6ofhFeaRrkN1H4+/Z/1GXwt4jSWfzFk0eS4cWk6bmB2QXTvDlVI2XVvyBjHVfsReOtL8MeE7z/hEfgbpvxa+O1lftJosmqSy6laWtk6ACaHRgQLy7hffg5YIHicxkqTX6Uf8HI37EP8AwyX+0zpP7Tmg+Hodc8E+J4f+Ee+IWjCNUiurOVRAW+Uja5Uqivj5JEtW+Yq1fjv8XfhncfAH4nw21nqUmraW6Q6z4d1q3d7b+2tMlJNvdIynfG7oGR1zuilSVGG5CK+X9m5KWHqaO77pX6rdNp3ulfWMlpofoOFrRr0k49df+B8jr/22PBHjbw/8Zbq8+I225+JmqWq6x428jym/s+8uJmEYuVh/dwXDxmIugwoZlAAYkV2v7GnibQ/2jPhXqH7N/jbU7fR49c1Jtb+G/iG8l2weHvEbR+X9jnfqljfjZG5GRHKI5Np5NeneJfiF4M8HfsYahD8PvCPibw34B8datZ22v+LvEtrDrmpeNULCW8i1LUEVY9PjtZli8uytt11MQJSUyGf5V+P37NniH4GNoc+s6Pqln4d8baamu+HJ7+MR3F5p0ruIHmQEmKYqmShPIIdSyMrHKjJVafsanuyT0atuknotUrfy3emj6o3g1OPK/kcr438D618NfF+reHPEel3ug+INDuZLHULC6TbPZzodrIw9jyD0IIIyDX7nf8EFP2ttN/aO/Y2XwNH4d/sPU/gxHZ6RO0LvNa6nBN5skd0Nw/dyGRH3plhuZWBG7A/N3wt4t0D/AIKi+ENL8J+NNX03w3+0folvHp3hfxZfyGK0+JduiqkGl6pM2Vj1FANsF65CyqFikywVj9kf8G9/wP8AE37Mnhn4yax47sbrwrfatr9l4PtNF1K38ia71C0hnuJRGW5d1EgQFAVKliCRzXi8TONfL5Rqq1SLVlrq7pXXdNN+nWzCrJNWluj9Bv7Fk0jX9US1tmmvtQuYbsGOI7XJl2RKz5GehGwZAJzxkmvw/wDg/eaT4q/4K0fEj4napIt/4T+Dt9rHxHvAGX/ThpjAWkGcFQZr420eehLnb2r9lf2mP2g9S/Z00Pxl4mm0lr/QfDHgUasscTGSa91eW/Nrb2sQHU4K5BGS0sXbivwd8VW1x+zr+xz4g0W6jW61z41eKt66oLlbgXOhaRKzlgwP/LfUpVLHqWsWBC4FeLwrh5OFV/z2ivnrL5qOplG70R4X4u8Q3fxD8V6tr2tbLnVtevZtSvpGG7zJ5XaRzzk/edsZJ471nvZQyfehibktyg6nqalor9KWisj0OVWsNt0FncRzQ/uZomV45I/keNl+6ysOQR2I5HamLZQoD+7T5upIyW6jk9+p6+tS0UByoaI1U5CqDz29eT+dCxqhJVVUnrgdep/qfzp1FBQV6t+zR8LNF1CHUviH48Tb8N/BUq/a4C2yTxNflS0GlW2fvu5AaQgERxAlvvAFv7PP7MD/ABd0S+8Y+KNW/wCEM+E/h6QLrPiSRN8lw/y4sbCPrcXkm4BVHyoDuYgCqP7Q/wC0Ivxgl0vSdE0lfCPw88JRvb+HfD0cgdbJCSXuJ5Bjz7qU8yTNyeAMAYrjqVHVk6NJ/wCJ9vJf3n+G76J4ylzPlj95zXxE+IOu/HT4n6hr2rf6d4g8S3oIgtITgu2Eit4IlydqqEjRFGcKo5Nez/ATRvhNffD7VtB8bfCD4ga38QPDpu3v20jxXLpN95a4KN9hltJVUQjf5zMVCIiuQATl37Hvwa0e81t7XWPiL4h+Bvxa1Vo28B6rq2jS2mkFgcMGvjtktLmUsghuEBSMK+51aRdur/wUg+IOqaf+0F4itvEvhHxf4P8AjVcpHZeNr/UvFFrfG+ha1ij8tYrKJIUEsSRbyGcOjY53E1hUqKc1h6asl2bjtbta8dbXTdnpYxlLmfJHY8E1DSNN+IHxWbT/AAXYXdhpGq3wg0m21C8FxPDCSArTzYAYhQXdgoUDdgACv0a/4N8f2Nbb9sP/AIKM2fiiGzMnw9+ENtBb2rvFujvWgxiRi3ysZG+Y4GcXI6AV8F/Djwjqmi+G7JtJhkuPGnxIP9j+G7eMhmt7R3MVxdsPvIZCGhRsgiMXL9Npr+pr/gib/wAE9rP/AIJ6/sWaJoUlv5fiLXUXUdVdlKursMqhBwQfmLEbVwX2kDbXTGn7aqqC26+i3+/4e/xPoefm2MVGi7b7L/M+wKKKK+mPgwooooA4n9on4BeG/wBp74M6/wCB/Fmm2+qaH4gtHtbiCZAwIYEcEg4POMjkZOMGv5bf21P2CtW/Yz+NWofs2/EC8aHTbi8utW+EfjO+fy7aOSV1MmnXj7SBDcbY1YAgQXEkM/yxTyFv6yK+af8AgqP/AMEz/BP/AAU4/Zv1Hwb4os0j1WBDPomqxov2rS7kD5XjY9M/dYE7WUkHsR5OY4NzarUviW/42a819zV4vfT1srzB0Jck37r/AAZ/KP8AA34tah+x58eGTxd4J03xF/wjN9PDfeGPFFlJcQ6TqKYT7V9l8xFNzC8aZV8iREKHggiD9rmbU9V+LN14k8RfFrRPi94m8XRJrOrazpc880MbOimKKV5UjAlSM7TCibYAvlg44r3D9qv9lbxT8Pfir/wpf42mx8MfFzw7CLLwh44v5mt9I8a6dEQkFneTMAEZUBWC5cBk+SCbagR4/BvhP4rk/ZH/AGkLO98afDfSfFF/4Ovd194U8UQSxR+enKCVAVOVYK4Dbo3AwwZHOfJp1IzftYr3rbK3vLpZvpf0d7J7H21OSl78dyj8eP2YvF3wA0zw3J4u0z+z4fGGjWutWIZ186KC5QtEs8WS8EhCkqsgXcAGXIPH1l4R/wCCxn/C3vAvgLwL8YtH1nTNL8ACxudC8c+CL6RPE+iapZxmGLUGiuHMFzGYTsktyFyC7K25qz9G+J+j/HnxzY+OPiB4s0vxT4TvrC3uPi3qGl2L2/iGayuNUiUz3iuAWvBJtjSKyV47axgyjB5Aa8x+PH7BWr+A/iD4ksU1LwHo66RYP4ghl/t/y9D1rSHEbWl9pt5cnEiXJkMcULytIXjkXI8tgOao6FdqGLS5o6p6q3e3W+1+jTT2dieZTVqm5+ofwI+K3jXw1+zD4++Mninx8v7V2mt4m0S80nUPDuky/aTo1tIILkx2HlJ9iurc3JmdFUlGCuTyHr8cf2mvGun+Jfih/Y+i6lNqvhzwLYw+GNHuZU8t7i3tt+6Zk/haSZ55D67+/U9X4M/aT+PX7CWo3Pgi38U/FD4Xm3d7+Xw+lxJpzJNNGpWYxOPutthZtv3gvqa7ST/gptJ8Wwi/HP4Q/DH42XQwra7c2r+HvEbp8ow9/YbPMYKow8kbMDk5OWB5MDl9TCVZ1oRU4y25WlpZJWVlHa+qa369HTjKL5lqfL9FfTguf2MfHduZJYP2kvhjfSAH7PbtpfiawjOTnDt5M+ACOvUA9+rY/wBnz9k+/PmJ+018RrGMsD5Nz8J5JJAvJI3Jd7c8gZ7EHg5GPW+vxXxwmv8At2T/APSU0b+3XVM+ZaK+m1+FP7H/AIVkC6h8avjj4u+X/mB/D210/Jx63V0e/r69e9Rj48/sw/Cb/kTPgP4s+JF51GofE3xUUgTtlbHTREmWBPEjtt9zzR9ev/Dpyfy5f/SuUPbX+FM8N+D3wZ8XftC+NovDfgPwzrnjDXpgSLLSbRrmRFHVn28RqO7OQB617ef2evhf+yFJFefGXXrX4geNoAHj+HHg/U0mt7OYYO3WNTj3RIg5DQWxeUkFSyda5v4w/wDBRn4q/FnwbceF4dY0zwB4EmQI3hXwTp0WgaR5YOQsiwgSTAEA5mdzx9c8L8If2cfGfxr8d+F/D+g+HdU87xhq0Gjaddz2ckVnLcz5ZVErAKxKB3wDkqhNTKNaavWkoR7J6/8AgWlvkr9pEy5nrN2RN+0B+0v4n/aK1XT7jX5LHT9H0GD7Jonh/SYPsujaBBuJENpbgkKMscsSzuSSzEk10n7Nfw88EJ47+HureN/Huh6X4b8S3V3aX1xYZu7rwbN5Mi2N5eRMoBX7Rsl2R78JCQzKzADq/wBn4+GfAGieJPHHw78SeMvDfxe+EqyaxHFrdhZXWm63YRy+RP5IaIta3SCTOHV+ASGVgML+0h+3B8QviP4b/svxB428E/Eiy8VaOrTtceFrBtV0RJDn7NNeR28Ti5RlDHY7qMRtkNlVjmm/3NCNorR6tP5Lla2d07q70fVEczfuw0K/7RHxL8d+DPhFrXwf+IHxD8L/ABX0y01S1v8Aw7d2HiMeJo9JkUbpZrW6yzQwTRsUaFyp3jJRSGz5f8PvCVr4lOqeMPGkt+3hHSpx/aFw0jGfXbxgGTT4pCc+ZIvLyHIijBY87FaH4a/C6HxFo154k1++bw74G0ecRXupiLfLez8MbKyQ4E12yndgkIi5Z2AwG/Sr/gjV/wAEd/EH/BSX4j6D8QvHGhSeEfgn4Pkx4d0AyM26MmOYSP5g/fPKSJC7DEjHey+UI4pL0pr2VJat9Fa78vN7votW/POtVp0YOUntuz3D/g3I/wCCUmsfGb4kz/tJfFzSVt48LD4b0oo0MNtEmFiiWFh8sKxBVCE4CCNSGLSBf3crO8I+EtN8B+GrLR9Hs4dP03T4hDb28S4WNR/Mk5JJ5JJJySa0a97A4P2EPftzPe22myXktl336nweOxksRU5unRf13Ciiiu44gooooAKKKKAPnn/gor/wTS+Gv/BS34KXnhDx7pu6bG/TtUgwt5pM4+7NC5B2t2Ixh1+VgwwK/nh/4KB/8E9/Hv7Atxa+Dv2gNH1rxh8L9PQab4R+K+h2nnan4Xg3t5Nrcox2z2wJOLWaRdobNvMuGjP9UlYfxF+Gnh/4ueErzQfE2j6brmj6hGYrizvrdLiGZT1DI4KsOBwQQcc14+Oyv2j9pR0lv5N23v8AZfmk7rSSa29XAZpOh7stY/ivT/I/i68efA3xN8ErTT/GmmXlj4g8IyybdM8X6GxudNkLpzDPuXdbTFWKva3SI5BI2spyez/Z9/aF8I6/+014A8R/HKPVtW8G+Ajbiw0TRdOg/s9YbWSW4gsnt8gLbPcSuZCqyORLNw26v2X/AGzv+DZHUvhf4m1Tx3+yX4sbwXqF6S+o+C9VY3mg62hLHyXjcOvl/OwEUqSx46CPHP5LftJfsz2fwh8ftoPxu+G/ib9nLxRLIwOt6NYtq/g+/Zndgy26sWiXb8ubWeUAqf3IwQPHqVHf2NdPms1/et1aWt/WN99kfW4fGUq8bp3/AD+ZR0bxHr37Q/iSTxZ8XvEGk654P8QfEdNUvYbfU1S58RahcyKJLaExFp7WyEHm/vPLRFIVFw5ARulfsc6F4m/bi+Ovw+1G61Lw/wCHfhjF4o1dbiwjRpba10sySRxCKTO7evlRAbsrncScEVwNv+yJ48stMt/FXgmbSfHVjF5Ui6p4H1X7be2UjDcoltl2X1u/H8cI6Hng1m6D+0n43+E1946026nQ6t480tvD3iN9dsRJqs9o7Rs0JlkAuIyxiiJIYFtoznJyKDlf6tNbWsumqtp0aXf8tDqUX9l/oXPhx+yn4j+O58B/8IBDNr0nj7Wx4YtLSdBbzWOpCJJWSaT/AFZhMb+YJV4CJJuVShBzvEvwAn03w14u1fRPEnh3xdp/gO7htddn0xpVS3WaRoY54TIi/aLczIU81MffiJUBxjb+Fn7anjX4LeLfhtqfhtdF063+F2oT6lpunxWhW31CW4JF0bwli8xmiJhYkgiI7VwAKpzfHnR/C/ws8aeF/Bvhi50GP4gXUDarcXWpm8NrYwyefFp9qNissYmIZpZGaRlijX5RuL7XxKlsrfpza39I2tbre+2t/vEyr8Pv2c7rx98DfFXxEOu6Zp/hzwTqWn6XrCi3nuby2kvvO+zv5SqFMZMDgsHyCVG0k8emfAT9hC3+JPxAuPDupapfaheeIPAt9418BzaI0f2LxSbSGWd7Od5PntZGWCaMgjMci4PDBq4H4RftF2fwx/Z4+Jfw/u/DR1y3+Jk2lyXFz/aJtDp39n3HnxNGFjbc7lpEZmICo3yjPNL4Z/bK8XfDX4reD/GXhv8AsjQ7v4d6a+k+GrZ7f7ZaaTDIkiuSkxIlkczSszOCGaQ/LgKoitHFy51Tdt+Xb+VW8/iun/d87BL2jbsS/HLwrbfB/wCIui6povhbSIdP8OXFlBdG31V9f0PXL1ES8DxXLMpeOWB49yKQowdpGa9g+P8A+0p8NfDEiy+A/APgPw7rrNB4g0vxD4Z8b+INW1TTNS2rPaygXTCG3kgZtsiMhYFCitxurwPw74W+JX7Q+l2NlpOk+KPE2j6XKUs47SyZdK01m+9tZVW2hyB8zErnHJ4rYu/gF4b+F95LD8RvH2k2OpRpmPw94SMfiLVp5fM2eQ8sTfY4HB5O6Z2ABwhOAZnTptxjVk3KPROTv6pO7XrdK5D5UlzMofGj9pDxX+0t8RNT1rVLPQrfxL4zdIdXfw9o0enyeI52cMWljhGHllkCu4jCiV8MVZiSdPT/AIH6f8J9Ws4/iBa6hrPiq6lSPT/h5oc3mavcy7/9XqEkRZrJCB/qkDXLbh8sYO8fYX7DP/BKv9oL9rQxxfCv4ey/AjwbehVvPF2uEzeKL2MDLeXLJ5bwox2nZAtujEjLOOn7Nf8ABNL/AIIB/Bv/AIJ72dnqosf+Es8aLGpm1jUlEkofHzheyoT/AALhTzndnNOi51l7LCx0WmmytpZyV0rdo3lb+U4cZmVLDqzfyW58Df8ABKX/AIN8fF37TXivQvir+0hDbaf4d0uGMeHvBdpbrb2dnAuxo08pDtXbg7l+YM4DO0r7gP3X8H+DtL8AeG7TR9GsbfT9NsYxHDBCu1VA/mT3JySeTk1ooixIqqoVVGAAMAClr3sHl8KHvPWXfsuyXRfi+rZ8fjMdUxEve0XRBRRRXoHCFFFFABRRRQAUUUUAFFFFABXM/E/4N+FfjT4WvNE8VaBpWvaXqCGO4tr22SaOUYx8ysCD+OeldNRWdSlCpHkqJNdnqioylF80XZn5o/tMf8Gsn7N/xk1+TXPB1rr3wp17bmCfwxfG1hgkzkSCJldFPbEYQY9+a+WPjL/wbnftWeHklGg/HHwr8WtLsW3WeneP9GXUDOuQ213nW4bO/njAwByelfurRXl1sloTd02vua+XMpW+Vj0qOcYmGl7+v/AsfzE/GT/gi/8AtS6TqETav+yn8HdajAMRk8JX0mkuwAwWwl3EM5IOTGfXHp5/N/wSk+NVvceXL+xP4hZ1TB8jxxOylgoGQRcMOvJAPqOO39W1FYxyepHSNTT0l+k0vwOxZ/UtZx/E/lR03/gkZ8fL+aP+z/2M1t3dl+bVvGM88IBHBZBeJlTuBP8AuEeor3j4Wf8ABBv9rzx7Z2sKfDP9nX4Pwna5v49EjvtSiJ3DhpFuCMZyfnXHB5IxX9G1FH9izl/EqX9E/wD26Ul+DFLP6jXuxX9fcfi/4C/4NY/GXxetI1+P37Qni7xZYQkmPQtIc2WnIcgjEZ3oACM/IiE/L024P3V+yB/wRB/Zv/Yq+x3HhP4e6Xca1Zg7dW1JPtd8ScZPmvlx06Agc9OlfW1FdNPJsNGPLO8l2e3/AICko/gcFbNMTU+1b00/4JHaWcOn26xQRRwxr0RFCqPwFSUUV6cYqK5Y7Hn3vqwoooqgCiiigAooooA//9k=';
  tipoDoc = '';
  valorImagenParaDescargar = '';
  nombreDoc = '';
  
  listaPersonas: any = [];
  nombreCompleto ='';
  numEmpleado = '';
 
  listaIdiomas: any = [];
  listaEscolaridad: any =[];
  listaMediaFil: any = [];
  listaDocsByCveEmp : any = [];

  listaEscoPDF: any = [];
  listaIdiomasPDF: any = [];

  previzualizacionDoc: any = [];

  datosPersonales: any = [];
  datosDomicilio: any = [];
  datosComplementarios: any = [];

  todosLosDatos: any =[];


  listaIdiomasLenght: any;
  listaEscolaridadLenght: any;
  listaMediaFilLenght: any;
  datosPersonalesLenght: any ;
  datosDomicilioLenght: any ;
  datosComplementariosLenght: any;



  valoresInputBusqueda: DatosBuscarInputs={
    CVE_EMPLEADO: '',
    NOMBRE: '',
    APE_PATERNO: '',
    APE_MATERNO: ''
  }

  newRegistrarIdiomas: DatosIdiomas = {
    CVE_EMPLEADO: '',
    CONSECUTIVO: 0,
    IDIOMA: '',
    LECTURA: '',
    ESCRITURA: '',
    CONVERSACION: '',
    IdEnlace: 0,
    IdIdiomas: 0,
    NOMBRE: '',
    APE_PATERNO:'',
    APE_MATERNO: ''

  }
 
  newRegistrarDatosEscolares: DatosEscolares = {
    
    IdEstudios:'',
    IdEnlace: '',
    CONSECUTIVO: 0,
   // NOMBRE: this.cookieService.get('Nombrethis'),
    NOMBRE: '',
    APE_PATERNO:'',
    APE_MATERNO:'',
    CVE_EMPLEADO: '',
    ESCOLARIDAD:'',
    ESCUELA:'',
    ESPECIALIDAD:'',
    CEDULA:'',
    TRATAMIENTO:'',
    FCH_INICIO:'',
    FCH_TERMINO:''        

      
  }



  constructor(
    public router: Router,
    public modal: NgbModal,
    private datosInicialesService: DatosInicialesExpedientesService,
    private datosEscolaresService: DatosEscolaresServiService,
    private datosIdiomasService : IdiomasService,
    private datosDocumentosService : DocumentosService,
    public datosPDC: DatosPDomComService,

    private sanitizer : DomSanitizer,
  ) { }

  ngOnInit(): void {
  }


  async abrirModalVerInfoGeneral(verInfoGeneral: any, CVE_EMPLEADO: any){
    // await this.LlenarTodasListas(CVE_EMPLEADO);
     await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
       res=>{
         this.datosPersonales = res;
         this.previzualizacionDoc =  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.datosPersonales[0].FRONTAL);
         this.valorImagenParaDescargar = 'data:image/jpg;base64, ' + this.datosPersonales[0].FRONTAL;

         //this.bufferToBase64ImageSourceRegisAnteriores(this.datosPersonales[0].FRONTAL.data);
         
         console.log('DATOSSSSSSPERFOS',this.datosPersonales);
         this.datosPersonalesLenght = Object.keys(this.datosPersonales).length;
 
         this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
           resDom=>{
             this.datosDomicilio = resDom;
             console.log(this.datosDomicilio);
             this.datosDomicilioLenght = Object.keys(this.datosDomicilio).length;
              
 
             this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
               resCom=>{
                 this.datosComplementarios = resCom;
                 console.log(this.datosComplementarios);
                 this.datosComplementariosLenght = Object.keys(this.datosComplementarios).length;
                 if(this.datosComplementariosLenght != 0){
 
                   if(this.datosComplementarios[0].PERTENECE_ETNIA === '0'){
                     console.log('soy 0', this.datosComplementarios[0].PERTENECE_ETNIA);
                     this.datosComplementarios[0].PERTENECE_ETNIA = 'NO';
                   }else{
                     console.log('soy 1', this.datosComplementarios[0].PERTENECE_ETNIA);
                     this.datosComplementarios[0].PERTENECE_ETNIA = 'SI';
                   }
 
                   if(this.datosComplementarios[0].HABLA_LEN_INDIGENA === '0'){
                     console.log('soy 0', this.datosComplementarios[0].HABLA_LEN_INDIGENA);
                     this.datosComplementarios[0].HABLA_LEN_INDIGENA = 'NO';
                   }else{
                     console.log('soy 1', this.datosComplementarios[0].HABLA_LEN_INDIGENA);
                     this.datosComplementarios[0].HABLA_LEN_INDIGENA = 'SI';
                   }
 
                   if(this.datosComplementarios[0].ES_PADRE === '0'){
                     console.log('soy 0', this.datosComplementarios[0].ES_PADRE);
                     this.datosComplementarios[0].ES_PADRE = 'NO';
                   }else{
                     console.log('soy 1', this.datosComplementarios[0].ES_PADRE);
                     this.datosComplementarios[0].ES_PADRE = 'SI';
                   }
 
                   if(this.datosComplementarios[0].TIENE_DISCAPACIDAD === '0'){
                     console.log('soy 0', this.datosComplementarios[0].TIENE_DISCAPACIDAD);
                     this.datosComplementarios[0].TIENE_DISCAPACIDAD = 'NO';
                   }else{
                     console.log('soy 1', this.datosComplementarios[0].TIENE_DISCAPACIDAD);
                     this.datosComplementarios[0].TIENE_DISCAPACIDAD = 'SI';
                   }
 
                 }//del if
                
 
                 this.datosEscolaresService.GetDatosEscolaresByCveEm(CVE_EMPLEADO).subscribe(
                   resEsc=>{
                     this.listaEscoPDF = [['ESCOLARIDAD','ESCUELA','ESPECIALIDAD','FECHA INICIO','FECHA TERMINO']];
                   
                     this.listaEscolaridad = resEsc;
                     this.listaEscolaridadLenght = Object.keys(this.listaEscolaridad).length;
                     
                     this.listaEscolaridad.map(row =>{
                      //console.log([row.CEDULA, row.ESCOLARIDAD]);
                     this.listaEscoPDF.push([row.ESTUDIO, row.ESCUELA, row.ESPECIALIDAD, row.FCH_INICIO, row.FCH_TERMINO]) 
                       
                     });
                     
                     
                    
                     
                     console.log(this.listaEscolaridad);
                     console.log('holi', this.listaEscoPDF);
 
                     this.datosInicialesService.GetDatosMediaFiliacionEditar(CVE_EMPLEADO).subscribe(
                       resMediaFil=>{
                         this.listaMediaFil = resMediaFil;
                         this.listaMediaFilLenght = Object.keys(this.listaMediaFil).length;
 
                         this.datosIdiomasService.getIdiomasByCveEmp(CVE_EMPLEADO).subscribe(
                           resIdio=>{
     
                             this.listaIdiomasPDF = [['IDIOMA','LECTURA','ESCRITURA','CONVERSACION']];
                           
                             this.listaIdiomas = resIdio;
                             this.listaIdiomasLenght = Object.keys(this.listaIdiomas).length;
                             this.listaIdiomas.map(row=>{
                               this.listaIdiomasPDF.push([row.IDIOMA, row.LECTURA,row.ESCRITURA,row.CONVERSACION])
                             })
     
                             this.modal.open(verInfoGeneral,{size:'xl'});
                             console.log(this.listaIdiomas);
                             
                           },
                           err=>{
                             console.log(err);
                             
                           }
                         )
 
                       }
                     ),
                     err =>{
                       console.log(err);
                       
                     }
                   /*  this.datosIdiomasService.getIdiomasByCveEmp(CVE_EMPLEADO).subscribe(
                       resIdio=>{
 
                         this.listaIdiomasPDF = [['IDIOMA','LECTURA','ESCRITURA','CONVERSACION']];
                       
                         this.listaIdiomas = resIdio;
                         this.listaIdiomasLenght = Object.keys(this.listaIdiomas).length;
                         this.listaIdiomas.map(row=>{
                           this.listaIdiomasPDF.push([row.IDIOMA, row.LECTURA,row.ESCRITURA,row.CONVERSACION])
                         })
 
                         this.modal.open(verInfoGeneral,{size:'xl'});
                         console.log(this.listaIdiomas);
                         
                       },
                       err=>{
                         console.log(err);
                         
                       }
                     )*/
                   },
                   err=>{
                     console.log(err);
                     
                   }
                 )
               },
               err=>{
                 console.log(err);
                 
               }
             )
           },
           err=>{
             console.log(err);
           }
         )
       },
       err=>{
         console.log(err);
         
       }
     )
   
 
     //this.modal.open(verInfoGeneral,{size:'xl'});
  }
 
  abrirModalVerDocumentos(verDocs: any,NOMBRE:any, APE_PATERNO:any, APE_MATERNO:any, CVE_EMPLEADO: any){
     this.nombreCompleto = NOMBRE + ' ' + APE_PATERNO +' '+ APE_MATERNO;
     this.numEmpleado = CVE_EMPLEADO;
     this.getListaDocumentosCve(CVE_EMPLEADO);
 
     this.modal.open(verDocs,{size:'xl'});
 
  }
 
  async openDescargar(contDescargarDocs:any, documento:any){
     this.nombreDoc = '';
     this.tipoDoc = '';
     console.log('insercion', this.tipoDoc);
     
 
     if(documento.TIPO_INSERCION === null){
       console.log('soy null', documento.TIPO_INSERCION);
       this.valorImagenParaDescargar = 'data:image/jpg;base64, ' + documento.DOCUMENTO;
       this.previzualizacionDoc =  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + documento.DOCUMENTO); //this.bufferToBase64ImageSourceRegisAnteriores(documento.DOCUMENTO.data);
       this.nombreDoc = documento.desc_doc;
       this.tipoDoc = documento.TIPO_INSERCION;
      
       
       
 
     }else{
       if(documento.TIPO_INSERCION === 'NEW2022'){
         console.log('no soy null', documento.TIPO_INSERCION);
         this.valorImagenParaDescargar =  'data:application/pdf;base64, ' + documento.DOCUMENTO;
         this.previzualizacionDoc = 'data:application/pdf;base64, ' + documento.DOCUMENTO;// await   this.bufferToBase64ImageSourceNewRegis(documento.DOCUMENTO.data);
         this.nombreDoc = documento.desc_doc;
         this.tipoDoc = documento.TIPO_INSERCION;
         
       }/*else{
         this.bufferToBase64ImageSourceRegisAnteriores(documento.DOCUMENTO.data);
 
 
       }*/
       
       
 
     }
 
 
     this.modal.open(contDescargarDocs,{size:'xl'});
 
  }
 
 
   async getListaByCve(){
     await this.datosInicialesService.getListaNomSearchByCve(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
   async getListaByNombre(){
     await this.datosInicialesService.getListaNomSearchByNom(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
   async getListaByNomAP(){
     await this.datosInicialesService.getListaNomSearchByNomAP(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
   async getListaByNomCompleto(){
     await this.datosInicialesService.getListaNomSearchByNomComplet(this.valoresInputBusqueda).subscribe(
       res=>{
         this.listaPersonas = res;
         if(Object.keys(this.listaPersonas).length == 0){
           Swal.fire(
             '',
             'No se encontraron coincidencias',
             'info'
           );
           
         }
         console.log(this.listaPersonas);
         
       },
       err=>{
         //alert("Ha ocurrido un error, favor de intentarlo nuevamente")
         console.log(err);
         
       }
     )
   }
 
   buscarData(){
     console.log(this.valoresInputBusqueda);
 
     
     if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == '' ){
       console.log('TODOS VACIOS');
       Swal.fire(
         '',
         'Aún no ha ingresado datos para buscar',
         'info'
       );
       this.listaPersonas = [];
       //alert('No hay datos para buscar');
     }else{
       if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && this.valoresInputBusqueda.NOMBRE == '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
         console.log('cveEmpleado with valor');
         this.getListaByCve(); 
 
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO == '' && this.valoresInputBusqueda.APE_MATERNO == ''){
         console.log('nombre with valor');
         this.getListaByNombre();
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO == ''){
         console.log('nombre y AP with valor');
         this.getListaByNomAP();
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE != '' && this.valoresInputBusqueda.APE_PATERNO != '' && this.valoresInputBusqueda.APE_MATERNO != ''){
         console.log('nombre, AP Y AM  with valor');
         this.getListaByNomCompleto();
       }
 
       if(this.valoresInputBusqueda.CVE_EMPLEADO != '' && (this.valoresInputBusqueda.NOMBRE != '' || this.valoresInputBusqueda.APE_PATERNO != '' || this.valoresInputBusqueda.APE_MATERNO != '')){
         Swal.fire({
           title:'INFORMACIÓN NO VÁLIDA',
           html:'La consultas que puede realizar son las siguientes:<br><br>'+
                 '<ol align="left"><li> Por <b>Número de empleado</b></li>'+
                 '<li>Por <b>Nombre</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b> + <b>Apellido Materno</b></li></ol><br>',
                 
           icon:'info'
         });
         this.listaPersonas = [];
        // alert('busqueda incorrecta');
       }
 
       if((this.valoresInputBusqueda.CVE_EMPLEADO == '' && this.valoresInputBusqueda.NOMBRE == '' ) && (this.valoresInputBusqueda.APE_PATERNO != '' || this.valoresInputBusqueda.APE_MATERNO != '')){
         //alert('2da busqueda incorrecta');
         Swal.fire({
           title:'INFORMACIÓN NO VÁLIDA',
           html:'La consultas que puede realizar son las siguientes:<br>'+
                 '<ol align="left"><li> Por <b>número de empleado</b></li>'+
                 '<li>Por <b>Nombre</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b></li>'+
                 '<li>Por <b>Nombre</b> + <b>Apellido Paterno</b> + <b>Apellido Materno</b></li></ol><br>',
                 
           icon:'info'
         });
         this.listaPersonas = [];
       }
 
      
      
       
     }
       
     
 
   }
 
   //--------------------------------
   async traerDatosP_Dom_DC(CVE_EMPLEADO:any){
     await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
       res=>{
         this.datosPersonales = res;
         console.log(this.datosPersonales);
         
 
         this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
           resDom=>{
             this.datosDomicilio = resDom;
             console.log(this.datosDomicilio);
             
 
             this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
               resCom=>{
                 this.datosComplementarios = resCom;
                 console.log(this.datosComplementarios);
               },
               err=>{
                 console.log(err);
                 
               }
             )
           },
           err=>{
             console.log(err);
             
           }
         )
 
       },
       err=>{
         console.log(err);
         
       }
     )
   }
 
 
   async getListaEscolaridades(CVE_EMPLEADO: any){
     console.log('cve',this.newRegistrarDatosEscolares.CVE_EMPLEADO );
     
     await this.datosEscolaresService.GetDatosEscolaresByCveEm(CVE_EMPLEADO).subscribe(
       res=>{
        
         this.listaEscolaridad = res;
         this.listaEscolaridadLenght = Object.keys(this.listaEscolaridad).length;
        
         console.log(this.listaEscolaridad);
   
         
         
         
       },
       err=>{
         console.log(err);
         
       }
     )
 
   }
 
   async getListaIdiomas(CVE_EMPLEADO: any){
     //console.log('cve',this.newRegistrarDatosEscolares.CVE_EMPLEADO );
     
     await this.datosIdiomasService.getIdiomasByCveEmp(CVE_EMPLEADO).subscribe(
       res=>{
        
         this.listaIdiomas = res;
         this.listaIdiomasLenght = Object.keys(this.listaIdiomas).length;
         
         console.log(this.listaIdiomas);
         
       },
       err=>{
         console.log(err);
         
       }
     )
 
 
 
   }
 
 
   async getDatosPersonales(CVE_EMPLEADO: any){
     await this.datosInicialesService.GetDatosPersonEditar(CVE_EMPLEADO).subscribe(
       res=>{
         this.datosPersonales = res;
         console.log(this.datosPersonales);
         this.datosPersonalesLenght = Object.keys(this.datosPersonales).length;
         
        // this.todosLosDatos.push(this.datosPersonales[0]);
       },
       err=>{
         console.log(err);
         
       }
     )
 
   }
 
   async getDatosDomicilio(CVE_EMPLEADO: any){
     
    await  this.datosInicialesService.GetDatosDomEditar(CVE_EMPLEADO).subscribe(
       resDom=>{
         this.datosDomicilio = resDom;
         console.log(this.datosDomicilio);
         this.datosDomicilioLenght = Object.keys(this.datosDomicilio).length;
         //this.todosLosDatos.push(this.datosDomicilio);
       },
       err=>{
         console.log(err);
         
       }
     )
 
   }
 
   async getDatosComplementarios(CVE_EMPLEADO: any){
     await this.datosInicialesService.GetDatosComplementariosEditar(CVE_EMPLEADO).subscribe(
       resCom=>{
         this.datosComplementarios= resCom;
         console.log(this.datosComplementarios);
         this.datosComplementariosLenght = Object.keys(this.datosComplementarios).length;
        // this.todosLosDatos.push(this.datosComplementarios);
       },
       err=>{
         console.log(err);
         
       }
     )
     
   }
 
   async getListaDocumentosCve(CVE_EMPLEADO: any){
     await this.datosDocumentosService.getListaDocsByCveEmp(CVE_EMPLEADO).subscribe(
       res=>{
         this.listaDocsByCveEmp = res;
         
         console.log('listadocs',this.listaDocsByCveEmp); 
       },
       err=>{
         console.log(err);
         
       }
     )
 
 
 
   }
 
 
   cerrarModalVerDocs(){
     this.tipoDoc = '';
   }
 
 
 
   downloadImage() {
     
     const linkSource = this.valorImagenParaDescargar;
     const downloadLink = document.createElement("a");
     downloadLink.href = linkSource;
    
     if(this.tipoDoc === 'NEW2022'){
       console.log('soy 2022');
       downloadLink.download = this.nombreDoc+'.'+this.numEmpleado+'.pdf';
       downloadLink.click();
    
     }else{
       console.log('soy null');
       downloadLink.download = this.nombreDoc+'.'+this.numEmpleado+'.jpeg';
       downloadLink.click();
       
     }
 
   }
 
   crearDescargarPDfInfoGeneral(){
     if(this.datosPersonalesLenght !=0 &&  this.datosDomicilioLenght !=0 && this.datosComplementariosLenght!=0 && this.listaEscolaridadLenght!=0 && this.listaIdiomasLenght!=0){
         //todo
         console.log('todo');
         const pdfDefinition: any = {
      
           content:[
             {columns:[
               
               {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
              // {text:' '},
               {image:this.logoFGJE_PDF, width:79, height:75},
               //, alignment: 'center'
     
             ]},
             
             //DATOS PERSONALES
             {columns:[
               {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
               {text:' ', width:25},
               [
                 {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_EMPLEADO},
                 ]},
                 {text: [
                   {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
                 ]},
                 {text: [
                   {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].EDO_CIV},
                 ]},
                 {text: [
                   {text:'SEXO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].SEXO},
                 ]},
                 {text: [
                   {text:'RFC: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_RFC},
                 ]},
                 {text: [
                   {text:'CURP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CURP},
                 ]},
                 {text: [
                   {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_ELECTOR},
                 ]},
                 {text: [
                   {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].LICENCIA},
                 ]},
                 {text: [
                   {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PASAPORTE},
                 ]},
                 {text: [
                   {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CARTILLA},
                 ]}
     
               ],
             ]},
     
             //DATOS PERSONALES
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].FECHA_NAC},
                 ]},
                 {text: [
                   {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PAIS},
                 ]},
                 {text: [
                   {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].Ciudad},
                 ]},
                 {text: [
                   {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NACIONALIDAD_NAME},
                 ]}
               ],
     
               //DATOS DOMICILIO
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'EMAIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].EMAIL},
                 ]},
                 {text: [
                   {text:'TELEFONO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].TELEFONO},
                 ]},
                 {text: [
                   {text:'CELULAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CELULAR},
                 ]}
               ]
             ]},
     
             //DATOS DOMICILIO
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CALLE},
                 ]},
                 {text: [
                   {text:'ENTRE CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ENTRE_CALLE},
                 ]},
                 {text: [
                   {text:'Y CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].Y_CALLE},
                 ]},
                 {text: [
                   {text:'NO. EXT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_EXTERIOR + '    '},
                   {text:'NO. INT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_INTERIOR},
                 ]},
                 {text: [
                   {text:'COL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].COLONIA + '  '},
                   {text:'CP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CODIGO_POSTAL}
     
                 ]},
                 {text: [
                   {text:'ENTIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].MUNI_NAME},
                 ]},
                 {text: [
                   {text:'CIUDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CIUDAD},
                 ]}
               ],
     
               //DATOS COMPLEMENTARIOS
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'PERTENECE A ETNIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].PERTENECE_ETNIA},
                 ]},
                 {text: [
                   {text:'HABLA LENGUA INDIGENA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].HABLA_LEN_INDIGENA},
                 ]},
                 {text: [
                   {text:'ES PADRE/MADRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].ES_PADRE},
                 ]},
                 {text: [
                   {text:'CUENTA CON ALGUNA DISCAPACIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].TIENE_DISCAPACIDAD},
                 ]}
     
               ]
             ]},
             //ESTUDIOS
             {text:' '},
             {text:'ESTUDIOS', color: '#8F0000' , bold: true},
             {text:' '},
     
     
             {table:{
               margin: [5, 5, 5, 5],
               headerRows: 1,
               alignment: 'justify',
               body:
                 this.listaEscoPDF
             }},
     
             //IDIOMAS
             {text:' '},
             {text:'IDIOMAS', color: '#8F0000' , bold: true},
             {text:' '},
             {table:{
               
               margin: [5, 5, 5, 5],
               headerRows: 1,
               alignment: 'justify',
               body:
                 this.listaIdiomasPDF,
                 border: [false, true, true, false],
                 fillColor: '#eeeeee',
             }}
     
             
     
           ]
         }
         const pdf = pdfMake.createPdf(pdfDefinition);
         pdf.open();
         
     }else{
       if(this.datosPersonalesLenght !=0 &&  this.datosDomicilioLenght !=0  && this.listaEscolaridadLenght!=0 && this.listaIdiomasLenght!=0 && this.datosComplementariosLenght === 0){
         //todo menos datos complementarios
         console.log('todo  menos datos comp');
         const pdfDefinition: any = {
      
           content:[
             {columns:[
               
               {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
              // {text:' '},
               {image:this.logoFGJE_PDF, width:79, height:75},
               //, alignment: 'center'
     
             ]},
             
             //DATOS PERSONALES
             {columns:[
               {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
               {text:' ', width:25},
               [
                 {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_EMPLEADO},
                 ]},
                 {text: [
                   {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
                 ]},
                 {text: [
                   {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].EDO_CIV},
                 ]},
                 {text: [
                   {text:'SEXO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].SEXO},
                 ]},
                 {text: [
                   {text:'RFC: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_RFC},
                 ]},
                 {text: [
                   {text:'CURP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CURP},
                 ]},
                 {text: [
                   {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_ELECTOR},
                 ]},
                 {text: [
                   {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].LICENCIA},
                 ]},
                 {text: [
                   {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PASAPORTE},
                 ]},
                 {text: [
                   {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CARTILLA},
                 ]}
     
               ],
             ]},
     
             //DATOS PERSONALES
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].FECHA_NAC},
                 ]},
                 {text: [
                   {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PAIS},
                 ]},
                 {text: [
                   {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].Ciudad},
                 ]},
                 {text: [
                   {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NACIONALIDAD_NAME},
                 ]}
               ],
     
               //DATOS DOMICILIO
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'EMAIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].EMAIL},
                 ]},
                 {text: [
                   {text:'TELEFONO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].TELEFONO},
                 ]},
                 {text: [
                   {text:'CELULAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CELULAR},
                 ]}
               ]
             ]},
     
             //DATOS DOMICILIO
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CALLE},
                 ]},
                 {text: [
                   {text:'ENTRE CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ENTRE_CALLE},
                 ]},
                 {text: [
                   {text:'Y CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].Y_CALLE},
                 ]},
                 {text: [
                   {text:'NO. EXT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_EXTERIOR + '    '},
                   {text:'NO. INT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_INTERIOR},
                 ]},
                 {text: [
                   {text:'COL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].COLONIA + '  '},
                   {text:'CP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CODIGO_POSTAL}
     
                 ]},
                 {text: [
                   {text:'ENTIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].MUNI_NAME},
                 ]},
                 {text: [
                   {text:'CIUDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CIUDAD},
                 ]}
               ],
     
               //DATOS COMPLEMENTARIOS
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text:'No se encontraron registros'}
     
               ]
             ]},
             //ESTUDIOS
             {text:' '},
             {text:'ESTUDIOS', color: '#8F0000' , bold: true},
             {text:' '},
     
     
             {table:{
               margin: [5, 5, 5, 5],
               headerRows: 1,
               alignment: 'justify',
               body:
                 this.listaEscoPDF
             }},
     
             //IDIOMAS
             {text:' '},
             {text:'IDIOMAS', color: '#8F0000' , bold: true},
             {text:' '},
             {table:{
               
               margin: [5, 5, 5, 5],
               headerRows: 1,
               alignment: 'justify',
               body:
                 this.listaIdiomasPDF,
                 border: [false, true, true, false],
                 fillColor: '#eeeeee',
             }}
     
             
     
           ]
         }
         const pdf = pdfMake.createPdf(pdfDefinition);
         pdf.open();
       }
 
       if(this.datosDomicilioLenght ===0  && this.listaEscolaridadLenght===0 && this.listaIdiomasLenght===0 && this.datosComplementariosLenght === 0 && this.datosPersonalesLenght !=0 ){
         //solo datos personales
         console.log('solo datos personales');
         const pdfDefinition: any = {
      
           content:[
             {columns:[
               
               {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
              // {text:' '},
               {image:this.logoFGJE_PDF, width:79, height:75},
               //, alignment: 'center'
     
             ]},
             
             //DATOS PERSONALES
             {columns:[
               {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
               {text:' ', width:25},
               [
                 {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_EMPLEADO},
                 ]},
                 {text: [
                   {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
                 ]},
                 {text: [
                   {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].EDO_CIV},
                 ]},
                 {text: [
                   {text:'SEXO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].SEXO},
                 ]},
                 {text: [
                   {text:'RFC: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_RFC},
                 ]},
                 {text: [
                   {text:'CURP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CURP},
                 ]},
                 {text: [
                   {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_ELECTOR},
                 ]},
                 {text: [
                   {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].LICENCIA},
                 ]},
                 {text: [
                   {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PASAPORTE},
                 ]},
                 {text: [
                   {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CARTILLA},
                 ]}
     
               ],
             ]},
     
             //DATOS PERSONALES
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].FECHA_NAC},
                 ]},
                 {text: [
                   {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PAIS},
                 ]},
                 {text: [
                   {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].Ciudad},
                 ]},
                 {text: [
                   {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NACIONALIDAD_NAME},
                 ]}
               ],
     
               //DATOS DOMICILIO
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text:'No se encontraron registros'},
               ]
             ]},
     
             //DATOS DOMICILIO
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text:'No se encontraron registros'}
                 
               ],
     
               //DATOS COMPLEMENTARIOS
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text:'No se encontraron registros'}
                 
     
               ]
             ]},
             //ESTUDIOS
             {text:' '},
             {text:'ESTUDIOS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'},
     
     
     
             //IDIOMAS
             {text:' '},
             {text:'IDIOMAS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'},
             
     
             
     
           ]
         }
         const pdf = pdfMake.createPdf(pdfDefinition);
         pdf.open();
       }
       if(this.datosPersonalesLenght !=0 &&  this.datosDomicilioLenght !=0 && this.listaEscolaridadLenght!=0 && this.datosComplementariosLenght ===0  && this.listaIdiomasLenght ===0){
         //solo hay dom, dp, esc
         console.log('solo dom, dp, esc');
 
         const pdfDefinition: any = {
      
           content:[
             {columns:[
               
               {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
              // {text:' '},
               {image:this.logoFGJE_PDF, width:79, height:75},
               //, alignment: 'center'
     
             ]},
             
             //DATOS PERSONALES
             {columns:[
               {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
               {text:' ', width:25},
               [
                 {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_EMPLEADO},
                 ]},
                 {text: [
                   {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
                 ]},
                 {text: [
                   {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].EDO_CIV},
                 ]},
                 {text: [
                   {text:'SEXO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].SEXO},
                 ]},
                 {text: [
                   {text:'RFC: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_RFC},
                 ]},
                 {text: [
                   {text:'CURP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CURP},
                 ]},
                 {text: [
                   {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_ELECTOR},
                 ]},
                 {text: [
                   {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].LICENCIA},
                 ]},
                 {text: [
                   {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PASAPORTE},
                 ]},
                 {text: [
                   {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CARTILLA},
                 ]}
     
               ],
             ]},
     
             //DATOS PERSONALES
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].FECHA_NAC},
                 ]},
                 {text: [
                   {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PAIS},
                 ]},
                 {text: [
                   {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].Ciudad},
                 ]},
                 {text: [
                   {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NACIONALIDAD_NAME},
                 ]}
               ],
     
               //DATOS DOMICILIO
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'EMAIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].EMAIL},
                 ]},
                 {text: [
                   {text:'TELEFONO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].TELEFONO},
                 ]},
                 {text: [
                   {text:'CELULAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CELULAR},
                 ]}
               ]
             ]},
     
             //DATOS DOMICILIO
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CALLE},
                 ]},
                 {text: [
                   {text:'ENTRE CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ENTRE_CALLE},
                 ]},
                 {text: [
                   {text:'Y CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].Y_CALLE},
                 ]},
                 {text: [
                   {text:'NO. EXT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_EXTERIOR + '    '},
                   {text:'NO. INT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_INTERIOR},
                 ]},
                 {text: [
                   {text:'COL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].COLONIA + '  '},
                   {text:'CP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CODIGO_POSTAL}
     
                 ]},
                 {text: [
                   {text:'ENTIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].MUNI_NAME},
                 ]},
                 {text: [
                   {text:'CIUDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CIUDAD},
                 ]}
               ],
     
               //DATOS COMPLEMENTARIOS
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text:'No se encontraron registros'}
                 
     
               ]
             ]},
             //ESTUDIOS
             {text:' '},
             {text:'ESTUDIOS', color: '#8F0000' , bold: true},
             {text:' '},
     
     
             {table:{
               margin: [5, 5, 5, 5],
               headerRows: 1,
               alignment: 'justify',
               body:
                 this.listaEscoPDF
             }},
     
             //IDIOMAS
             {text:' '},
             {text:'IDIOMAS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'}
             
     
           ]
         }
         const pdf = pdfMake.createPdf(pdfDefinition);
         pdf.open();
 
         
       }
       if(this.datosPersonalesLenght !=0 &&  this.datosDomicilioLenght !=0 && this.datosComplementariosLenght===0 && this.listaEscolaridadLenght ===0 && this.listaIdiomasLenght===0){
         //solo dom y dp
         console.log('solo dom y dp');
         const pdfDefinition: any = {
      
           content:[
             {columns:[
               
               {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
              // {text:' '},
               {image:this.logoFGJE_PDF, width:79, height:75},
               //, alignment: 'center'
     
             ]},
             
             //DATOS PERSONALES
             {columns:[
               {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
               {text:' ', width:25},
               [
                 {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_EMPLEADO},
                 ]},
                 {text: [
                   {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
                 ]},
                 {text: [
                   {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].EDO_CIV},
                 ]},
                 {text: [
                   {text:'SEXO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].SEXO},
                 ]},
                 {text: [
                   {text:'RFC: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_RFC},
                 ]},
                 {text: [
                   {text:'CURP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CURP},
                 ]},
                 {text: [
                   {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_ELECTOR},
                 ]},
                 {text: [
                   {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].LICENCIA},
                 ]},
                 {text: [
                   {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PASAPORTE},
                 ]},
                 {text: [
                   {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CARTILLA},
                 ]}
     
               ],
             ]},
     
             //DATOS PERSONALES
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].FECHA_NAC},
                 ]},
                 {text: [
                   {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PAIS},
                 ]},
                 {text: [
                   {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].Ciudad},
                 ]},
                 {text: [
                   {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NACIONALIDAD_NAME},
                 ]}
               ],
     
               //DATOS DOMICILIO
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'EMAIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].EMAIL},
                 ]},
                 {text: [
                   {text:'TELEFONO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].TELEFONO},
                 ]},
                 {text: [
                   {text:'CELULAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CELULAR},
                 ]}
               ]
             ]},
     
             //DATOS DOMICILIO
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CALLE},
                 ]},
                 {text: [
                   {text:'ENTRE CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ENTRE_CALLE},
                 ]},
                 {text: [
                   {text:'Y CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].Y_CALLE},
                 ]},
                 {text: [
                   {text:'NO. EXT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_EXTERIOR + '    '},
                   {text:'NO. INT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_INTERIOR},
                 ]},
                 {text: [
                   {text:'COL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].COLONIA + '  '},
                   {text:'CP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CODIGO_POSTAL}
     
                 ]},
                 {text: [
                   {text:'ENTIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].MUNI_NAME},
                 ]},
                 {text: [
                   {text:'CIUDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CIUDAD},
                 ]}
               ],
     
               //DATOS COMPLEMENTARIOS
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text:'No se encontraron registros'},
     
               ]
             ]},
             //ESTUDIOS
             {text:' '},
             {text:'ESTUDIOS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'},
     
             //IDIOMAS
             {text:' '},
             {text:'IDIOMAS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'},
     
             
     
           ]
         }
         const pdf = pdfMake.createPdf(pdfDefinition);
         pdf.open();
 
         
       }
 
       if(this.datosPersonalesLenght !=0 &&  this.datosDomicilioLenght !=0 && this.datosComplementariosLenght !=0 && this.listaEscolaridadLenght ===0 && this.listaIdiomasLenght===0){
         console.log('solo dom y dp y DC');
         const pdfDefinition: any = {
      
           content:[
             {columns:[
               
               {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
              // {text:' '},
               {image:this.logoFGJE_PDF, width:79, height:75},
               //, alignment: 'center'
     
             ]},
             
             //DATOS PERSONALES
             {columns:[
               {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
               {text:' ', width:25},
               [
                 {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_EMPLEADO},
                 ]},
                 {text: [
                   {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
                 ]},
                 {text: [
                   {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].EDO_CIV},
                 ]},
                 {text: [
                   {text:'SEXO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].SEXO},
                 ]},
                 {text: [
                   {text:'RFC: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_RFC},
                 ]},
                 {text: [
                   {text:'CURP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CURP},
                 ]},
                 {text: [
                   {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CVE_ELECTOR},
                 ]},
                 {text: [
                   {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].LICENCIA},
                 ]},
                 {text: [
                   {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PASAPORTE},
                 ]},
                 {text: [
                   {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].CARTILLA},
                 ]}
     
               ],
             ]},
     
             //DATOS PERSONALES
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].FECHA_NAC},
                 ]},
                 {text: [
                   {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].PAIS},
                 ]},
                 {text: [
                   {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].Ciudad},
                 ]},
                 {text: [
                   {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosPersonales[0].NACIONALIDAD_NAME},
                 ]}
               ],
     
               //DATOS DOMICILIO
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'EMAIL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].EMAIL},
                 ]},
                 {text: [
                   {text:'TELEFONO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].TELEFONO},
                 ]},
                 {text: [
                   {text:'CELULAR: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CELULAR},
                 ]}
               ]
             ]},
     
             //DATOS DOMICILIO
             {columns:[
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CALLE},
                 ]},
                 {text: [
                   {text:'ENTRE CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ENTRE_CALLE},
                 ]},
                 {text: [
                   {text:'Y CALLE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].Y_CALLE},
                 ]},
                 {text: [
                   {text:'NO. EXT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_EXTERIOR + '    '},
                   {text:'NO. INT: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].NO_INTERIOR},
                 ]},
                 {text: [
                   {text:'COL: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].COLONIA + '  '},
                   {text:'CP: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CODIGO_POSTAL}
     
                 ]},
                 {text: [
                   {text:'ENTIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].ESTADO},
                 ]},
                 {text: [
                   {text:'MUNICIPIO: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].MUNI_NAME},
                 ]},
                 {text: [
                   {text:'CIUDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosDomicilio[0].CIUDAD},
                 ]}
               ],
     
               //DATOS COMPLEMENTARIOS
               [
                 {text:' '},
                 {text:' '},
                 {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
                 {text:' '},
                 {text: [
                   {text:'PERTENECE A ETNIA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].PERTENECE_ETNIA},
                 ]},
                 {text: [
                   {text:'HABLA LENGUA INDIGENA: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].HABLA_LEN_INDIGENA},
                 ]},
                 {text: [
                   {text:'ES PADRE/MADRE: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].ES_PADRE},
                 ]},
                 {text: [
                   {text:'CUENTA CON ALGUNA DISCAPACIDAD: ', bold:true, color: '#6C6C6C'},
                   {text: this.datosComplementarios[0].TIENE_DISCAPACIDAD},
                 ]}
     
               ]
             ]},
             //ESTUDIOS
             {text:' '},
             {text:'ESTUDIOS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'},
     
     
     
             //IDIOMAS
             {text:' '},
             {text:'IDIOMAS', color: '#8F0000' , bold: true},
             {text:' '},
             {text:'No se encontraron registros'},
             
             
             
     
           ]
         }
         const pdf = pdfMake.createPdf(pdfDefinition);
         pdf.open();
       }
       
     }
 
 
 
 
   /* if(this.datosDomicilioLenght === 0){
    
    }else{
     const pdfDefinition: any = {
      
       content:[
         {columns:[
           
           {text: 'INFORMACION GENERAL DE PERSONAL',fontSize: 20, color: '#A09003' , bold: true,width:'*'},
          // {text:' '},
           {image:this.logoFGJE_PDF, width:79, height:75},
           //, alignment: 'center'
 
         ]},
         
         //DATOS PERSONALES
         {columns:[
           {image: this.valorImagenParaDescargar, width:150, height:165, background:'red'},
           {text:' ', width:25},
           [
             {text:'IDENTIFICACIONES', color: '#8F0000' , bold: true},
             {text:' '},
             {text: [
               {text:'NO. EMPLEADO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].CVE_EMPLEADO},
             ]},
             {text: [
               {text:'NOMBRE: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].NOMBRE+ ' '+ this.datosPersonales[0].APE_PATERNO + ' '+this.datosPersonales[0].APE_MATERNO},
             ]},
             {text: [
               {text:'EDO. CIVIL: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].EDO_CIV},
             ]},
             {text: [
               {text:'SEXO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].SEXO},
             ]},
             {text: [
               {text:'RFC: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].CVE_RFC},
             ]},
             {text: [
               {text:'CURP: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].CURP},
             ]},
             {text: [
               {text:'CLAVE ELECTOR: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].CVE_ELECTOR},
             ]},
             {text: [
               {text:'LICENCIA: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].LICENCIA},
             ]},
             {text: [
               {text:'PASAPORTE: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].PASAPORTE},
             ]},
             {text: [
               {text:'CARTILLA MILITAR: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].CARTILLA},
             ]}
 
           ],
         ]},
 
         //DATOS PERSONALES
         {columns:[
           [
             {text:' '},
             {text:' '},
             {text:'INFORMACION DE NACIMIENTO', color: '#8F0000' , bold: true},
             {text:' '},
             {text: [
               {text:'FECHA DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].FECHA_NAC},
             ]},
             {text: [
               {text:'PAIS DE NACIMIENTO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].PAIS},
             ]},
             {text: [
               {text:'ESTADO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].ESTADO},
             ]},
             {text: [
               {text:'MUNICIPIO NACIMIENTO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].Ciudad},
             ]},
             {text: [
               {text:'NACIONALIDAD: ', bold:true, color: '#6C6C6C'},
               {text: this.datosPersonales[0].NACIONALIDAD_NAME},
             ]}
           ],
 
           //DATOS DOMICILIO
           [
             {text:' '},
             {text:' '},
             {text:'INFORMACION DE CONTACTO', color: '#8F0000' , bold: true},
             {text:' '},
             {text: [
               {text:'EMAIL: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].EMAIL},
             ]},
             {text: [
               {text:'TELEFONO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].TELEFONO},
             ]},
             {text: [
               {text:'CELULAR: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].CELULAR},
             ]}
           ]
         ]},
 
         //DATOS DOMICILIO
         {columns:[
           [
             {text:' '},
             {text:' '},
             {text:'INFORMACION DE DOMICILIO', color: '#8F0000' , bold: true},
             {text:' '},
             {text: [
               {text:'CALLE: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].CALLE},
             ]},
             {text: [
               {text:'ENTRE CALLE: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].ENTRE_CALLE},
             ]},
             {text: [
               {text:'Y CALLE: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].Y_CALLE},
             ]},
             {text: [
               {text:'NO. EXT: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].NO_EXTERIOR + '    '},
               {text:'NO. INT: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].NO_INTERIOR},
             ]},
             {text: [
               {text:'COL: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].COLONIA + '  '},
               {text:'CP: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].CODIGO_POSTAL}
 
             ]},
             {text: [
               {text:'ENTIDAD: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].ESTADO},
             ]},
             {text: [
               {text:'MUNICIPIO: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].MUNI_NAME},
             ]},
             {text: [
               {text:'CIUDAD: ', bold:true, color: '#6C6C6C'},
               {text: this.datosDomicilio[0].CIUDAD},
             ]}
           ],
 
           //DATOS COMPLEMENTARIOS
           [
             {text:' '},
             {text:' '},
             {text:'INFORMACION COMPLEMENTARIA', color: '#8F0000' , bold: true},
             {text:' '},
             {text: [
               {text:'PERTENECE A ETNIA: ', bold:true, color: '#6C6C6C'},
               {text: this.datosComplementarios[0].PERTENECE_ETNIA},
             ]},
             {text: [
               {text:'HABLA LENGUA INDIGENA: ', bold:true, color: '#6C6C6C'},
               {text: this.datosComplementarios[0].HABLA_LEN_INDIGENA},
             ]},
             {text: [
               {text:'ES PADRE/MADRE: ', bold:true, color: '#6C6C6C'},
               {text: this.datosComplementarios[0].ES_PADRE},
             ]},
             {text: [
               {text:'CUENTA CON ALGUNA DISCAPACIDAD: ', bold:true, color: '#6C6C6C'},
               {text: this.datosComplementarios[0].TIENE_DISCAPACIDAD},
             ]}
 
           ]
         ]},
         //ESTUDIOS
         {text:' '},
         {text:'ESTUDIOS', color: '#8F0000' , bold: true},
         {text:' '},
 
 
         {table:{
           margin: [5, 5, 5, 5],
           headerRows: 1,
           alignment: 'justify',
           body:
             this.listaEscoPDF
         }},
 
         //IDIOMAS
         {text:' '},
         {text:'IDIOMAS', color: '#8F0000' , bold: true},
         {text:' '},
         {table:{
           
           margin: [5, 5, 5, 5],
           headerRows: 1,
           alignment: 'justify',
           body:
             this.listaIdiomasPDF,
             border: [false, true, true, false],
             fillColor: '#eeeeee',
         }}
 
         
 
       ]
     }
     const pdf = pdfMake.createPdf(pdfDefinition);
     pdf.open();
 
 
    }*/
     
 
     
   }//crearpdf
    




}

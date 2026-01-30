package com.ufc.apiPenduraAi.controllers.divida;

import com.ufc.apiPenduraAi.dtos.divida.CreateDividaDTO;
import com.ufc.apiPenduraAi.dtos.divida.ReturnDividasDTO;
import com.ufc.apiPenduraAi.dtos.divida.SearchDevedor;
import com.ufc.apiPenduraAi.dtos.divida.UpdateDividaDTO;
import com.ufc.apiPenduraAi.services.divida.DividaServices;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/divida")
public class DividaController {

    @Autowired
    private DividaServices services;

    @PostMapping
    public ResponseEntity createDivida(@RequestBody CreateDividaDTO data){
        services.addDivida(data);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).build();
    }

    @GetMapping
    public ResponseEntity<List<ReturnDividasDTO>> pesquisarDivida(@RequestParam(name = "cliente") String data){
        List<ReturnDividasDTO> response = services.findDivida(data);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity updateDivida(@PathVariable int id, @RequestBody UpdateDividaDTO data){
        services.updadeValor(data, id);
        return ResponseEntity.ok("Valor Atualizado!");
    }

    @DeleteMapping("/{id}/quitar")
    public ResponseEntity quitarDivida(@PathVariable int id){
        services.quitarDivida(id);
        return ResponseEntity.ok("Quitado!");
    }
}

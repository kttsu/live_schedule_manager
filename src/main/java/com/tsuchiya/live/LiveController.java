package com.tsuchiya.live;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/live")
public class LiveController {
    private final LiveService liveService;

    public LiveController(LiveService liveService) {
        this.liveService = liveService;
    }


    @PostMapping
    public ResponseEntity<LiveResponse> insert(@RequestBody LiveRequest liveRequest, UriComponentsBuilder uriBuilder) {
        Live live = liveService.insert(liveRequest.getSchedule(), liveRequest.getName(), liveRequest.getLocation());
        URI location = uriBuilder.path("/live/{id}").buildAndExpand(live.getId()).toUri();
        LiveResponse body = new LiveResponse("live created");
        return ResponseEntity.created(location).body(body);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<LiveResponse> update(@PathVariable("id") Integer id, @RequestBody LiveRequest liveRequest) {
        liveService.update(id, liveRequest.getSchedule(), liveRequest.getName(), liveRequest.getLocation());
        LiveResponse body = new LiveResponse("live updated"); // リクエストが成功した場合、200で返す。
        return ResponseEntity.ok(body);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Live> findById(@PathVariable Integer id) {
        Live live = liveService.findById(id);
        return ResponseEntity.ok(live);
    }

    @GetMapping
    public ResponseEntity<List<Live>> findAll() {
        List<Live> lives = liveService.findAll();
        return ResponseEntity.ok(lives);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LiveResponse> delete(@PathVariable Integer id) {
        liveService.delete(id);
        LiveResponse body = new LiveResponse("live deleted");
        return ResponseEntity.ok(body);
    }
}


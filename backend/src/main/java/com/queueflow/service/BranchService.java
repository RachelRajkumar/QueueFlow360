package com.queueflow.service;

import com.queueflow.entity.Branch;
import com.queueflow.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public Branch createBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    public List<Branch> getAllActiveBranches() {
        return branchRepository.findByIsActiveTrue();
    }
}

<?php

namespace App\Repository;

use App\Models\User;

interface UserRepositoryInterface{
    public function create(array $data): User;
    public function update(User $user, array $data): User;
    public function delete(User $user): bool;
    public function getById(int $id): ?User;
    public function getAllUsers();
    public function updatePassword(User $user, $password);
    
}

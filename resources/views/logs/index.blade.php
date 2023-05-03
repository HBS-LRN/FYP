<!DOCTYPE html>

<head>
    <body>
    @foreach ($logs as $log)
<p>{{$log->user_id}}</p>
<p>{{$log->table_name}}</p>
<p>{{$log->row_id}}</p>
<p>{{$log->json_decode(new_data['meal_price'])}}</p>
<p>{{$log->created_at}}</p>
@endforeach
</body>
</head>